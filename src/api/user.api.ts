import type { Profile, User } from "@/types"
import api from "./axios"
import type { ProfileFormInput } from "@/schema/profile"

export const getUserDetails_API = async (): Promise<User> => {
  const res = await api.get("/auth/me/user")
  return res.data.user
}

export const getUserProfile_Api = async (): Promise<Profile> => {
  const res = await api.get("/auth/me/profile/get")
  return res.data.exProfile
}

export const createProfile_Api = async (data: ProfileFormInput) => {
  const res = await api.post("/auth/me/profile/create", { data })
  return res.data
}
