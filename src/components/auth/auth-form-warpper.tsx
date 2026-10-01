import type { AUTH_FORM_WARPPER_TYPES } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { FcGoogle } from "react-icons/fc"
import storySetImgAuthFormWrapper from "../../assets/Spreadsheets-pana.png"

const AuthFormWrapper = ({
  children,
  card_disc,
  card_title,
}: AUTH_FORM_WARPPER_TYPES) => {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center select-none">
      <div className="grid w-full grid-cols-1 rounded-2xl border p-1 shadow sm:w-4xl sm:grid-cols-2">
        <div className="flex w-full items-center justify-center rounded-none bg-background ring-0">
          <img
            className="hidden sm:block md:w-lg"
            src={storySetImgAuthFormWrapper}
          />
        </div>
        <Card className="w-full rounded-none border-none bg-background shadow-none ring-0">
          <CardHeader className="space-y-4">
            {/*<div className="me-auto flex flex-col justify-start rounded-xl bg-accent px-5 py-2 ring ring-purple-500/30 md:text-4xl dark:bg-accent dark:ring-purple-600/30">
              <span className="text-center text-xl sm:text-2xl">Invento</span>
              <span className="text-[5px]">A Inventory Management system</span>
            </div>*/}
            <div>
              <CardTitle className="text-xl">{card_title}</CardTitle>
              <CardDescription className="text-xs">{card_disc}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <Separator />
          <CardFooter>
            <Button className="mx-auto" type="button" variant="outline">
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default AuthFormWrapper
