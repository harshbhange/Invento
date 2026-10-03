import { createRoot } from "react-dom/client"
import { RecoilRoot } from "@swarmica/recoil"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
)
