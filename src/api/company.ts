import type { companyZodSchemaType } from "@/schema/company"
import api from "./axios"

export const checkCompanyNameIsValid = async (name: string) => {
  const res = await api.get("auth/company/check-name", {
    params: {
      companyName: name,
    },

    // 409 means the request worked,
    // but the company name is already taken.
    validateStatus: (status) => status === 200 || status === 409,
  })

  return res.data
}

export const registerCompany = async (data: companyZodSchemaType) => {
  const res = await api.post("auth/company/create", { ...data })
  return res.data
}

export const getCompanyDetails = async () => {
  const res = await api("auth/company/my/details")
  return res.data
}
