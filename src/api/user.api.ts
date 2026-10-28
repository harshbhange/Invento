import type { Profile, User } from "@/types"
import api from "./axios"
import type { ProfileFormInput } from "@/schema/profile"

type getUserDetails_APIType = {
  user: User
  auth: boolean
}

export const getUserDetails_API = async (): Promise<getUserDetails_APIType> => {
  const res = await api.get("/auth/me/user")
  return { user: res.data.user, auth: res.data.auth }
}

export const getUserProfile_Api = async (): Promise<Profile> => {
  const res = await api.get("/auth/me/profile/get")
  return res.data.profile
}

type createProfile_Api_type = { message: string; profile: Profile }
export const createProfile_Api = async ({
  data,
  pathName,
}: {
  data: ProfileFormInput
  pathName: string
}): Promise<createProfile_Api_type> => {
  if (pathName === "update") {
    const res = await api.patch(`/auth/me/profile/${pathName}`, { ...data })
    return res.data
  }
  const res = await api.post(`/auth/me/profile/${pathName}`, { ...data })
  return res.data
}
