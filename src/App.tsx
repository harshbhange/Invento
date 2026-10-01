import { Routes, Route } from "react-router"
import { Home } from "./pages/home"
import { Company } from "./pages/company"
import Register from "./pages/auth/register"
import LogIn from "./pages/auth/login"
import AuthLayOut from "./pages/layout/auth.layout"
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<LogIn />}></Route>

        <Route element={<AuthLayOut />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/company" element={<Company />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
