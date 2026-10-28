import { Link } from "react-router"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card"
import CompanyRegisterForm from "./company-register-form"
import { Button } from "../ui/button"

const CompanyRegisterFormWrapper = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
        <Card className="w-full overflow-hidden rounded-xl border-border/60 shadow-lg">
          <CardHeader className="border-b bg-muted/20 px-6 py-5">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Create Your Company
            </CardTitle>

            <CardDescription className="mt-1">
              Set up your company profile and add some basic information about
              your business.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <CompanyRegisterForm />
          </CardContent>
          <CardFooter className="flex flex-col">
            <CardTitle className="w-full text-start">
              Want To join A Company
            </CardTitle>
            <CardDescription className="w-full text-start">
              Find Your Company To
              <Link to={"/auth/company/join"}>
                <Button variant={"link"} className="ps-0.5">
                  Join
                </Button>
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CompanyRegisterFormWrapper
