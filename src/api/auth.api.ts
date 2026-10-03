import type { LoginInput, RegisterInput } from "@/schema/auth"
import api from "./axios"
import type { User } from "@/types"

export type AuthApiType = {
  message: string
  user: User
}

export const registerUserAPI = async (
  data: RegisterInput
): Promise<AuthApiType> => {
  const response = await api.post("/auth/credentials/register", {
    ...data,
    provider: "CREDENTIALS",
  })
  return response.data
}

export const loginUserAPi = async (data: LoginInput) => {
  const response = await api.post("/auth/credentials/login", {
    ...data,
    provider: "CREDENTIALS",
  })
  return response.data
}

export const logOutApi = async () => {
  const res = api.post("/auth/credentials/logout")
  return res
}
