import { registerUserAPI } from "@/api/auth.api"
import AuthForm from "@/components/auth/auth-form"
import AuthFormWrapper from "@/components/auth/auth-form-warpper"
import { registerSchema } from "@/schema/auth"

const Register = () => {
  return (
    <>
      <AuthFormWrapper
        card_title="Register"
        card_disc="Enter email and Password to Register with Invento"
      >
        <AuthForm
          buttonText="Register"
          defaultValues={{ email: "", password: "" }}
          onSubmit={registerUserAPI}
          schema={registerSchema}
          fallbackLink="/auth/login"
          fallbackLinkText="Already have A Account Pleas Log in"
        />
      </AuthFormWrapper>
    </>
  )
}
export default Register
