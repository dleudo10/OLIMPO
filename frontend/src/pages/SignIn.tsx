import SignInForm from "../components/auth/SignInForm"
import PageMeta from "../components/common/PageMeta"
import AuthLayout from "../layout/AuthLayout"

const SignIn = () => {
    return (
        <>
            <PageMeta
                title="Iniciar Sesión | OLIMPO"
                description="Inicia sesión en tu cuenta de OLIMPO"
            />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    )
}

export default SignIn