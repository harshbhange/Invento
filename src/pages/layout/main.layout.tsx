import TopNavBar from "@/components/top-nav-bar"
import type React from "react"

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="scrollbar-thumb-current scrollbar-track-accent scroll-smooth">
      <TopNavBar />
      <main>{children}</main>
    </main>
  )
}

export default MainLayOut
