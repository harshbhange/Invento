import type { Profile, User } from "@/types"
import { atom } from "@swarmica/recoil"

export const loggedInUserAtom = atom<User | null>({
  key: "loggedInUser",
  default: null,
})

export const loggedInUsersProfileAtom = atom<Profile | null>({
  key: "profile",
  default: null,
})
