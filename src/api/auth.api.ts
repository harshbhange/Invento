import type { LoginInput, RegisterInput } from "@/schema/auth"
import api from "./axios"

export const registerUser = async (data: RegisterInput) => {
  const response = await api.post("/auth/cred/register", data)
  return response.data
}

export const loginUser = async (data: LoginInput) => {
  const response = await api.post("/auth/cred/login", data)
  return response.data
}
