import { loginUserAPi } from "@/api/auth.api"
import AuthForm from "@/components/auth/auth-form"
import AuthFormWrapper from "@/components/auth/auth-form-warpper"
import { loginSchema } from "@/schema/auth"

const LogIn = () => {
  return (
    <>
      <AuthFormWrapper
        card_title="Log In"
        card_disc="Enter email and Password to LogIn to Invento"
      >
        <AuthForm
          buttonText="Log In"
          defaultValues={{ email: "", password: "" }}
          onSubmit={loginUserAPi}
          schema={loginSchema}
          fallbackLink="/auth/register"
          fallbackLinkText="Don't have A Account Pleas Register"
        />
      </AuthFormWrapper>
    </>
  )
}
export default LogIn
