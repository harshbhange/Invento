import { Outlet } from "react-router"
import MainLayOut from "./main.layout"

const AuthLayOut = () => {
  return (
    <MainLayOut>
      <Outlet />
    </MainLayOut>
  )
}

export default AuthLayOut
