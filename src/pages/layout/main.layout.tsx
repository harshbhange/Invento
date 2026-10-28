import TopNavBar from "@/components/top-nav-bar"
import type React from "react"

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative scrollbar-thumb-current scrollbar-track-accent scroll-smooth">
      <TopNavBar />
      <main className="">{children}</main>
    </main>
  )
}

export default MainLayOut
