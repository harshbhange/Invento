import TopNavBar from "@/components/top-nav-bar"
import type React from "react"

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopNavBar />
      <main>{children}</main>
    </>
  )
}

export default MainLayOut
