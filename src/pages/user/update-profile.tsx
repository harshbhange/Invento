import ProfileFormWrapper from "@/components/profile/profile-form-wrapper"
import ProfileGifDisplay from "@/components/profile/profile-gif-display"

const UpdateProfile = () => {
  return (
    <div className="h-full overflow-hidden sm:h-100">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
        {/* Page Header */}
        <div className="shrink-0 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Update Profile
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Keep your personal information up to date.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
          {/* GIF */}
          <div className="hidden min-h-0 items-center justify-center lg:flex">
            <ProfileGifDisplay />
          </div>

          {/* Form */}
          <div className="min-h-0">
            <ProfileFormWrapper />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
