import ProfileFormWrapper from "@/components/profile/profile-form-wrapper"
import ProfileGifDisplay from "@/components/profile/profile-gif-display"

const UpdateProfile = () => {
  return (
    <div className="h-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
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
