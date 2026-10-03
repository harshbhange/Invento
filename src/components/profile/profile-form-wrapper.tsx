import { Link, useLocation } from "react-router"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card"

import { Separator } from "../ui/separator"
import ProfileForm from "./profile-form"

const ProfileFormWrapper = () => {
  const capitalizeName = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }
  const location = useLocation()
  const pathName = location.pathname.split("/profile/")[1]
  return (
    <Card className="h-f flex h-full w-full flex-col shadow-sm">
      {/* Header */}
      <CardHeader className="shrink-0 space-y-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {capitalizeName(pathName)} Your Profile
        </CardTitle>

        <CardDescription>
          {capitalizeName(pathName)} your personal information and keep your
          account details current.
        </CardDescription>
      </CardHeader>

      {/* Scrollable Form Area */}
      <CardContent className="h-full flex-1 sm:min-h-[40vh] sm:overflow-y-auto">
        <ProfileForm />
      </CardContent>

      <Separator />

      {/* Footer */}
      <CardFooter className="shrink-0 flex-col items-start gap-3 pt-5">
        <div>
          <p className="text-sm font-medium">Company</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Want to join a company or create your own?
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            to="/company/registe"
            className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
          >
            Join a company
          </Link>

          <Link
            to="/company/join"
            className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
          >
            Start your own
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProfileFormWrapper
