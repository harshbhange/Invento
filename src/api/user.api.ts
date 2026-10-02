import type { Profile, User } from "@/types"
import api from "./axios"

export const getUserDetails_API = async (): Promise<User> => {
  const res = await api.get("/auth/me/user")
  return res.data.user
}

export const getUserProfile_Api = async (): Promise<Profile> => {
  const res = await api.get("/auth/me/user/profile")
  return res.data.profile
}
