import type { User } from "@/types"
import { atom } from "@swarmica/recoil"

export const loggedInUserAtom = atom<User | null>({
  key: "loggedInUser",
  default: null,
})
