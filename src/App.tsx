import { Routes, Route } from "react-router"
import { Home } from "./pages/home"
import { Company } from "./pages/company"
import Register from "./pages/auth/register"
import LogIn from "./pages/auth/login"
import AuthLayOut from "./pages/layout/auth.layout"
import Profile from "./pages/user/profile"
import UpdateProfile from "./pages/user/update-profile"
import CompanyRegisterFormWrapper from "./components/company/company-register-form-wrapper"
import CompanyJoinFormWrapper from "./components/company/company-join-form-wrapper"
import CompanyProfile from "./pages/company/company-profile"

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

        {/* Company registration/join - accessible without company */}
        <Route
          path="/auth/company/register"
          element={<CompanyRegisterFormWrapper />}
        />

        <Route path="/auth/company/join" element={<CompanyJoinFormWrapper />} />

        {/* Existing company - protected */}
        <Route path="/auth/company" element={<Company />}>
          <Route index element={<CompanyProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
