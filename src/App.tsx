import { Routes, Route } from "react-router"
import { Home } from "./pages/home"
import { Company } from "./pages/company"
import Register from "./pages/auth/register"
import LogIn from "./pages/auth/login"
import AuthLayOut from "./pages/layout/auth.layout"
import Profile from "./pages/user/profile"
import UpdateProfile from "./pages/user/update-profile"

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<LogIn />} />

      {/* Protected / application routes */}
      <Route element={<AuthLayOut />}>
        <Route path="/" element={<Home />} />

        {/* User */}
        <Route path="/auth/user/profile">
          <Route index element={<Profile />} />
          <Route path="update" element={<UpdateProfile />} />
          <Route path="create" element={<UpdateProfile />} />
        </Route>

        {/* Company */}
        <Route path="/auth/company" element={<Company />} />
      </Route>
    </Routes>
  )
}

export default App
