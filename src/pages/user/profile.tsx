import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  UserRound,
  Building2,
  Pencil,
} from "lucide-react"
import { useNavigate } from "react-router"

import { getUserDetails_API, getUserProfile_Api } from "@/api/user.api"
import { useApi } from "@/hooks/call-api-hook"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const Profile = () => {
  const navigate = useNavigate()

  const { data: profile, loading: profileLoading } = useApi(getUserProfile_Api)

  const { data: user, loading: userLoading } = useApi(getUserDetails_API)

  const loading = profileLoading || userLoading

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
        <div className="h-32 animate-pulse rounded-xl bg-muted" />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted md:col-span-2" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">
          Unable to load user information.
        </p>
      </div>
    )
  }

  const handleUpdateProfile = () => {
    navigate("/auth/user/profile/update")
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-28 bg-muted" />

        <CardContent className="relative px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-3xl font-semibold text-primary-foreground">
                {profile?.name?.charAt(0).toUpperCase() ||
                  user.email.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <div className="pb-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {profile?.name || "Complete your profile"}
                </h1>

                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Update Profile */}
            <Button onClick={handleUpdateProfile}>
              <Pencil className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={user.email}
              />

              <InfoItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={profile?.phone}
              />

              <InfoItem
                icon={<CalendarDays className="h-4 w-4" />}
                label="Date of Birth"
                value={
                  profile?.dob
                    ? new Date(profile.dob).toLocaleDateString()
                    : null
                }
              />

              <InfoItem
                icon={<UserRound className="h-4 w-4" />}
                label="Gender"
                value={profile?.gender}
              />

              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Address"
                value={profile?.address}
              />
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-sm font-medium">Bio</p>

              <p className="text-sm leading-6 text-muted-foreground">
                {profile?.bio || "No bio added yet."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">Account type</p>

              <Badge variant="secondary" className="mt-2">
                {user.provider}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Member since</p>

              <p className="mt-1 text-sm font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <Separator />

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />

                <p className="text-sm font-medium">Companies</p>
              </div>

              {user.companyMembers?.length ? (
                <div className="space-y-2">
                  {user?.companyMembers.map((member) => (
                    <div key={member?.id} className="rounded-lg border p-3">
                      <p className="text-sm font-medium">
                        {member?.company.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {member?.role}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No company associated with this account.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete Profile */}
      {!profile && (
        <Card>
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Complete your profile</p>

              <p className="text-sm text-muted-foreground">
                Add your personal information to complete your profile.
              </p>
            </div>

            <Button onClick={handleUpdateProfile}>
              <Pencil className="mr-2 h-4 w-4" />
              Add Information
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

type InfoItemProps = {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="wrap-break-words mt-1 text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  )
}

export default Profile
