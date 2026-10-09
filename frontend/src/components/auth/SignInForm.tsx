import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useLocation, useNavigate } from "react-router";
import Input from "../form/input/InputField";
import Label from "../form/Label"
import Button from "../ui/button/Button";
import type { LoginPayload } from "../../types/auth.types";
import { useLogin } from "../../hooks/auth/useLogin";

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate()
    const location = useLocation()

    const loginMutation = useLogin()

	// Formulario
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginPayload>({
        shouldFocusError: true // Se enfoca automáticamente en el primer campo con error al enviar el formulario
    });

    /*
     * Ruta a la que intentaba acceder
     * el usuario antes de ser enviado
     * al login.
     */
    const from = location.state?.from || "/applications";

	// Envio de datos
    const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
        try {
            const response = await loginMutation.mutateAsync(data);

            if (!response.success) {
                return;
            }

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }

    const isLoading = isSubmitting || loginMutation.isPending;

    return (
        <div className="flex flex-col flex-1 ">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto bg-white p-10 rounded-2xl">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-brand-600 text-title-sm dark:text-white/90 sm:text-title-md">
                            Iniciar Sesión
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ingresa tus credenciales para acceder a todas las aplicaciones del ecosistema Olimpo.!
                        </p>
                    </div>
                    <div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="username" className="text-gray-500">
                                        Usuario{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="Ingresa tu usuario"
                                        // startIcon={<UserIcon />}
                                        hint={errors.username?.message}
                                        error={!!errors.username}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.username}
                                        autoComplete="username"
                                        {...register("username", {
                                            required: "El usuario es obligatorio",
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password" className="text-gray-500">
                                        Contraseña{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu contraseña"
                                        // startIcon={<LockIcon />}
                                        // endIcon={showPassword ? <EyeIcon aria-label="Ocultar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon aria-label="Mostrar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                        
                                        hint={errors.password?.message}
                                        error={!!errors.password}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.password}
                                        autoComplete="current-password"
                                        onEndIconClick={() => setShowPassword(!showPassword)}

                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                        })}
                                        
                                    />
                                </div>

                                {loginMutation.isError && (

                                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                                        No fue posible iniciar sesión.
                                        Verifica tus credenciales e inténtalo
                                        nuevamente.

                                    </div>

                                )}

                                <div>
                                    <Button type="submit" className="w-full" size="sm" disabled={isLoading} aria-busy={isLoading}>
                                        {isLoading ? "Cargando ..." : 'Iniciar sesión'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm