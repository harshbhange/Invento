import { z } from "zod"

export const companyZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .min(3, "Company name must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Company description is required")
    .min(10, "Company description must be at least 10 characters"),

  tags: z.array(z.string()).min(1, "Please add at least one tag"),
})

export type companyZodSchemaType = z.infer<typeof companyZodSchema>
