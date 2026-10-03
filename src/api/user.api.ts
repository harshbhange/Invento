import type { Profile, User } from "@/types"
import api from "./axios"
import type { ProfileFormInput } from "@/schema/profile"

export const getUserDetails_API = async () => {
  const res = await api.get("/auth/me/user")
  return { user: res.data.user, auth: res.data.auth }
}

export const getUserProfile_Api = async (): Promise<Profile> => {
  const res = await api.get("/auth/me/profile/get")
  return res.data.exProfile
}

export const createProfile_Api = async ({
  data,
  pathName,
}: {
  data: ProfileFormInput
  pathName: string
}) => {
  const res = await api.post(`/auth/me/profile/${pathName}`, { data })
  return res.data
}
