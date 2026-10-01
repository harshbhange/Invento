import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import {
  Controller,
  useForm,
  type DefaultValues,
  type FieldPath,
  type FieldValues,
  type Resolver,
} from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import type { ZodType } from "zod"
import { Spinner } from "../ui/spinner"
import { Link, useNavigate } from "react-router"
import type { AuthApiType } from "@/api/auth.api"

type AuthFormProps<T extends FieldValues> = {
  schema: ZodType<T, T>
  defaultValues: DefaultValues<T>
  onSubmit: (data: T) => Promise<AuthApiType>
  buttonText: string
  fallbackLink: string
  fallbackLinkText: string
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  buttonText,
  fallbackLink,
  fallbackLinkText,
}: AuthFormProps<T>) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const navigate = useNavigate()

  const form = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues,
  })

  const handleSubmit = async (data: T) => {
    setLoading(true)
    setServerError(null)

    try {
      const res = await onSubmit(data)
      if (res?.user?.id) {
        form.reset()
        navigate("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again."
        setServerError(message)
      } else {
        setServerError("Something went wrong. Please try again.")
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col justify-center space-y-5"
    >
      <div className="space-y-3">
        <FieldGroup>
          <Controller
            name={"email" as FieldPath<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-1">
                <FieldLabel>Email</FieldLabel>

                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="new-password"
                  {...field}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name={"password" as FieldPath<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-1">
                <FieldLabel>Password</FieldLabel>

                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete={
                    buttonText.toLowerCase() === "register"
                      ? "new-password"
                      : "current-password"
                  }
                  {...field}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      {serverError && (
        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        variant="outline"
        className="mx-auto bg-accent p-5 text-lg text-foreground"
        disabled={loading}
      >
        {loading && <Spinner />}
        {loading ? "Loading…" : buttonText}
      </Button>

      <div className="mx-auto hover:text-blue-700">
        <Link to={fallbackLink}>{fallbackLinkText}</Link>
      </div>
    </form>
  )
}

export default AuthForm
