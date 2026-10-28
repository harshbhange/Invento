import { companyZodSchema, type companyZodSchemaType } from "@/schema/company"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"

import { useState } from "react"
import { checkCompanyNameIsValid, registerCompany } from "@/api/company"
import axios from "axios"
import { useNavigate } from "react-router"

const CompanyRegisterForm = () => {
  const form = useForm<companyZodSchemaType>({
    resolver: zodResolver(companyZodSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
    },
  })

  const [isCompanyName, setIsCompanyName] = useState<boolean | null>(null)

  const [serverError, setServerError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const [tagInput, setTagInput] = useState("")

  const navigate = useNavigate()

  const checkCompanyName = async (name: string) => {
    const trimmedName = name.trim()

    setServerError(null)
    setIsCompanyName(null)

    if (!trimmedName) {
      setServerError("Company name is required")
      setIsCompanyName(false)
      return
    }

    if (trimmedName.length < 3) {
      setServerError("Company name must be at least 3 characters")
      setIsCompanyName(false)
      return
    }

    setLoading(true)

    try {
      const res = await checkCompanyNameIsValid(trimmedName)

      setIsCompanyName(res?.isNameAvailable ?? false)

      if (!res?.isNameAvailable) {
        setServerError(res?.message ?? "Company name is already taken")
      }
    } catch (error: unknown) {
      console.error("Company name check failed:", error)

      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ??
            "Unable to check company name. Please try again."
        )
      } else {
        setServerError("Something went wrong. Please try again.")
      }

      setIsCompanyName(false)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: companyZodSchemaType) => {
    if (isCompanyName === null) {
      setServerError("Please check your company name first.")
      return
    }

    if (isCompanyName === false) {
      setServerError("Please choose an available company name.")
      return
    }

    setLoading(true)

    try {
      const res = await registerCompany(data)

      console.log("Company created:", res)

      setServerError(null)

      form.reset()
      navigate("/auth/company")
      setTagInput("")
      setIsCompanyName(null)
    } catch (error: unknown) {
      console.error("Registering Company failed:", error)

      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ??
            "Unable to register company. Please try again."
        )
      } else {
        setServerError("Something went wrong. Please try again.")
      }
    } finally {
      form.reset()
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Company Name</FieldLabel>

                <div className="flex gap-2">
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Enter company name"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(e)
                      setIsCompanyName(null)
                      setServerError(null)
                    }}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    onClick={() => checkCompanyName(field.value)}
                  >
                    {loading ? "Checking..." : "Check"}
                  </Button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                {isCompanyName === true && (
                  <p className="text-sm text-green-600">
                    Company name is available
                  </p>
                )}

                {isCompanyName === false && serverError && (
                  <p className="text-sm text-destructive">{serverError}</p>
                )}
              </Field>
            )}
          />

          {/* ================================
                Description
            ================================= */}

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>

                <textarea
                  {...field}
                  disabled={loading}
                  placeholder="Describe your company"
                  aria-invalid={fieldState.invalid}
                  className="min-h-24 w-full resize-none rounded-xs border border-transparent bg-input/50 px-2.5 py-2 text-base transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-purple-400 focus-visible:ring-3 focus-visible:ring-purple-800/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ================================
                Tags
            ================================= */}

          <Controller
            control={form.control}
            name="tags"
            render={({ field, fieldState }) => {
              const addTag = (value: string) => {
                const tag = value.trim()

                if (!tag) return

                // Prevent duplicate tags
                if (
                  field.value.some(
                    (existingTag) =>
                      existingTag.toLowerCase() === tag.toLowerCase()
                  )
                ) {
                  setTagInput("")
                  return
                }

                field.onChange([...field.value, tag])

                setTagInput("")
              }

              const removeTag = (tagToRemove: string) => {
                field.onChange(field.value.filter((tag) => tag !== tagToRemove))
              }

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tags</FieldLabel>

                  {/* Tag Input Container */}
                  <div className="flex min-h-8 w-full min-w-0 flex-wrap items-center gap-1.5 rounded-xs border border-transparent bg-input/50 px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none focus-within:border-purple-400 focus-within:ring-3 focus-within:ring-purple-800/40 md:text-sm">
                    {/* Tags */}
                    {field.value.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex h-6 items-center gap-1 rounded-xs bg-secondary px-2 text-sm text-secondary-foreground"
                      >
                        {tag}

                        {/* Remove Tag */}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          disabled={loading}
                          className="inline-flex h-4 w-4 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                          aria-label={`Remove ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    {/* Tag Text Input */}
                    <input
                      value={tagInput}
                      disabled={loading}
                      placeholder={
                        field.value.length === 0
                          ? "Type a tag..."
                          : "Add another tag..."
                      }
                      className="h-6 min-w-32 flex-1 border-0 bg-transparent px-0 py-0 text-base outline-none placeholder:text-muted-foreground md:text-sm"
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        // Add with Enter
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag(tagInput)
                        }

                        // Add with comma
                        if (e.key === ",") {
                          e.preventDefault()
                          addTag(tagInput)
                        }

                        // Remove last tag
                        // with Backspace
                        if (
                          e.key === "Backspace" &&
                          !tagInput &&
                          field.value.length > 0
                        ) {
                          removeTag(field.value[field.value.length - 1])
                        }
                      }}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Press Enter or comma to add a tag.
                  </p>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )
            }}
          />

          {/* ================================
                General Server Error
            ================================= */}

          {serverError && isCompanyName !== false && (
            <div className="rounded-xs border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {/* ================================
                Submit Button
            ================================= */}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Company"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}

export default CompanyRegisterForm
