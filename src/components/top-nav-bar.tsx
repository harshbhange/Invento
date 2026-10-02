import { Link } from "react-router"
import UserButton from "./user-button"

const TopNavBar = () => {
  return (
    <nav className="flex h-16 w-full items-center border-b px-6 shadow-sm">
      {/* Logo */}
      <div className="shrink-0">
        <Link to="/">
          <p className="logo text-2xl">Invento</p>
        </Link>
      </div>

      {/* Navigation */}
      <ul className="ml-auto flex items-center gap-6">
        <li>
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/auth/company"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Company
          </Link>
        </li>

        <li>
          <UserButton />
        </li>
      </ul>
    </nav>
  )
}

export default TopNavBar
