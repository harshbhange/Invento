import z from "zod"

export const profileZodSchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  dob: z.coerce.date("Date of birth is required"),

  phone: z
    .string("Phone number is required")
    .trim()
    .regex(/^[0-9]{10,15}$/, "Phone number must contain 10 to 15 digits"),

  address: z
    .string("Address is required")
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address must not exceed 300 characters"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender must be MALE, FEMALE, or OTHER",
  }),

  bio: z
    .string("Bio is required")
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must not exceed 500 characters"),
})

export type ProfileFormInput = z.input<typeof profileZodSchema>
export type ProfileFormOutput = z.output<typeof profileZodSchema>
