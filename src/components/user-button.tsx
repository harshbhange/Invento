import { getUserDetails_API } from "@/api/user.api"
import type { User } from "@/types"

import { Spinner } from "./ui/spinner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Link } from "react-router"
import { Avatar } from "./ui/avatar"
import { useRecoilState } from "@swarmica/recoil"
import { loggedInUserAtom } from "@/context/atoms"
import { logOutApi } from "@/api/auth.api"

const UserButton = () => {
  const [user] = useRecoilState(loggedInUserAtom)
  if (user === null) {
    return <Spinner className="size-5" />
  }

  const name = user?.profile?.name?.trim()

  const initials = name
    ? name
        .split(/\s+/)
        .map((word) => word[0]?.toUpperCase())
        .join("")
    : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 gap-2 px-2 hover:bg-muted">
          <Avatar className="flex size-8 items-center justify-center">
            <span className="text-sm font-medium">{initials}</span>
          </Avatar>

          <span className="max-w-32 truncate text-sm font-medium">
            {name || "Update Profile"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="flex size-10 items-center justify-center">
              <span className="font-medium">{initials}</span>
            </Avatar>

            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">
                {name || "Profile not updated"}
              </span>

              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {user?.profile ? (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/auth/user/profile">Profile</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/auth/user/profile/update">Update Profile</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer">
          <Button
            className="w-full"
            onClick={async () => {
              try {
                const res = await logOutApi()
                window.location.reload()
                return res
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
