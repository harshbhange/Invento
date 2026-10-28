import { loggedInUserAtom } from "@/context/atoms"
import { useRecoilState } from "@swarmica/recoil"
import { Navigate, Outlet } from "react-router"

export const Company = () => {
  const [user] = useRecoilState(loggedInUserAtom)

  if (!user) {
    return <div>Loading...</div>
  }

  if (user.companyMembers?.length > 0) {
    return <Outlet />
  }
  console.log(user?.companyMembers?.length > 0)

  return <Navigate to="/auth/company/register" replace />
}
