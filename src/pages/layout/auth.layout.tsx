import { Navigate, Outlet } from "react-router"
import MainLayOut from "./main.layout"
import { useSetRecoilState } from "@swarmica/recoil"
import { loggedInUserAtom } from "@/context/atoms"
import { getUserDetails_API } from "@/api/user.api"
import { useApi } from "@/hooks/call-api-hook"
import { useEffect } from "react"

const AuthLayOut = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom)

  const { data, loading } = useApi(getUserDetails_API)

  console.log(data)
  useEffect(() => {
    if (!data) return

    setLoggedInUser(data.user)
  }, [data, setLoggedInUser])

  if (loading) {
    return <div className="h-screen w-screen">Loading</div>
  }

  return data?.auth == true ? (
    <MainLayOut>
      <Outlet />
    </MainLayOut>
  ) : (
    <Navigate to="/auth/register" />
  )
}

export default AuthLayOut
