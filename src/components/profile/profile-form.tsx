import {
  profileZodSchema,
  type ProfileFormInput,
  type ProfileFormOutput,
} from "@/schema/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"

import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { createProfile_Api } from "@/api/user.api"
import { useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router"

const ProfileForm = () => {
  const form = useForm<ProfileFormInput, ProfileFormOutput>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      bio: "",
      dob: "",
      gender: "OTHER",
    },
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const capitalizeName = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const navigate = useNavigate()
  const location = useLocation()
  const onSubmit = async (data: ProfileFormInput) => {
    setLoading(true)
    console.log(location)
    try {
      const res = await createProfile_Api({
        ...data,
        name: capitalizeName(data.name),
      })
      console.log(res.message)
      navigate("/auth/user/profile")
      setLoading(false)
      form.reset()
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
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex size-full flex-col gap-5"
    >
      {/* Name */}
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-1">
              <FieldLabel>Name</FieldLabel>

              <Input
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                disabled={loading}
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div>
        {/* Phone */}
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-1">
                <FieldLabel>Phone Number</FieldLabel>

                <Input
                  type="tel"
                  placeholder="9876543210"
                  autoComplete="tel"
                  inputMode="numeric"
                  disabled={loading}
                  {...field}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Date of Birth */}
        <FieldGroup>
          <Controller
            name="dob"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-1">
                <FieldLabel>Date of Birth</FieldLabel>

                <Input
                  type="date"
                  disabled={loading}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      {/* Gender */}
      <FieldGroup>
        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-1">
              <FieldLabel>Gender</FieldLabel>

              <select
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={loading}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <option value="OTHER">Other</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Address */}
      <FieldGroup>
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-1">
              <FieldLabel>Address</FieldLabel>

              <Textarea
                placeholder="Where do you live?"
                className="resize-none"
                rows={3}
                disabled={loading}
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Bio */}
      <FieldGroup>
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-1">
              <FieldLabel>About You</FieldLabel>

              <Textarea
                placeholder="Tell us a little about yourself..."
                className="resize-none"
                rows={4}
                disabled={loading}
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/*error */}
      {serverError && (
        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
          {serverError}
        </div>
      )}
      {/* Submit */}
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {form.formState.isSubmitting ? "Saving changes..." : "Update Profile"}
      </Button>
    </form>
  )
}

export default ProfileForm
