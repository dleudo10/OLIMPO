import { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router";
import Button from "../ui/button/Button";
import type { LoginPayload } from "../../types/auth.types";

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate()
	// Formulario
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginPayload>({
        shouldFocusError: true // Se enfoca automáticamente en el primer campo con error al enviar el formulario
    });

	// Envio de datos
    const onSubmit: SubmitHandler<LoginPayload> = (data) => {
        console.log(data)
        // enviar al inicio
        navigate("/applications", { replace: true });
    }

    const isLoading = isSubmitting;

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
                                        Usuario <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="Ingresa tu usuario de hosvital"
                                        // startIcon={<UserIcon />}
                                        hint={errors.username?.message}
                                        error={!!errors.username}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.username}
                                        ariaDescribedby="username-error"
                                        aria-busy={isLoading}
                                        {...register("username", {
                                            required: "El usuario es obligatorio",
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password" className="text-gray-500">
                                        Contraseña <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu contraseña de hosvital"
                                        // startIcon={<LockIcon />}
                                        // endIcon={showPassword ? <EyeIcon aria-label="Ocultar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon aria-label="Mostrar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                        onEndIconClick={() => setShowPassword(!showPassword)}
                                        hint={errors.password?.message}
                                        error={!!errors.password}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.password}
                                        ariaDescribedby="password-error"
                                        aria-busy={isLoading}
                                        autoComplete="current-password"
                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                        })}
                                        
                                    />
                                </div>
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