import { useTheme } from "../theme-provider"

import profileGif from "../../assets/Account.gif"
import profileGifDark from "../../assets/Account-dark.gif"

const ProfileGifDisplay = () => {
  const { theme } = useTheme()

  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={theme === "light" ? profileGif : profileGifDark}
        alt="Profile illustration"
        className="max-h-[50vh] w-auto max-w-full object-contain"
      />
    </div>
  )
}

export default ProfileGifDisplay
