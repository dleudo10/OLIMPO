// import type { ReactNode } from "react"

// type Props = {
//     children: ReactNode
// }

// const AuthLayout = ({ children }: Props) => {
//     return (
//         <div 
//             className="relative w-full h-screen flex items-center justify-center gap-4 bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: `url('${import.meta.env.BASE_URL}/images/background.png')` }}
//         >
//             {/* Overlay general */}
//             <div className="absolute inset-0 bg-brand-700/30" />

//             {/* Oscurecimiento adicional en la izquierda */}
//             <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/10 to-transparent" />

//             {/* Contenido */}
//             <div className="bg-white hidden lg:block relative z-10 text-center text-white">
//                 <h1 className="text-start mb-2 text-brand-700 text-title-sm dark:text-white/90 sm:text-title-md">
//                     Un solo acceso, <br /> 
//                     <span className="font-semibold">un universo de soluciones.</span>
//                 </h1>
//                 <p className="">Conecta, gestiona, decide.</p>
//             </div>

//             <div className="relative z-10">
//                 {children}
//             </div>

//             <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
//                 <p>© 2023 Olimpo. Todos los derechos reservados.</p>
//             </div>
//         </div>
//     )
// }

// export default AuthLayout


import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div
            className="relative min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}/images/background3.jpeg')`,
            }}
        >
            {/* Overlay general */}
            <div className="absolute inset-0 bg-brand-700/30" />

            {/* Oscurecimiento adicional en la izquierda */}
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/10 to-transparent" />

            {/* Columna izquierda */}
            <div className="relative z-10 hidden lg:flex items-center justify-center pl-50">
                <div className="w-90 text-white">

                    {/* Espacio para el icono */}
                    <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-xl border border-white/30 bg-white/10">
                        {/* Aquí irá el icono */}
                    </div>

                    {/* Título */}
                    <h2 className="text-[50px] font-bold tracking-[0.12em] leading-none">
                        OLIMPO
                    </h2>

                    {/* Subtítulo */}
                    <p className="mt-2 text-[11px] font-semibold tracking-[0.28em] text-white/80">
                        ECOSISTEMA DIGITAL · CLÍNICA ANTIOQUIA
                    </p>

                    {/* Guion */}
                    <div className="my-10 h-0.5 w-11.25 bg-white/60" />

                    {/* Texto principal */}
                    <h1 className="text-left text-[40px] font-normal leading-[1.4] text-white">
                        Un solo acceso,
                        <br />
                        <span className="font-semibold">
                            un universo de
                            <br />
                            soluciones.
                        </span>
                    </h1>

                    {/* Texto secundario */}
                    <p className="mt-4 text-left text-[20px] leading-6 text-white/70">
                        Conecta, gestiona y decide.
                    </p>

                </div>
            </div>

            {/* Columna derecha */}
            <div className="relative z-10 flex items-center justify-center pr-20">
                {children}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-white">
                <div className="flex gap-2 items-center pl-4">
                    <img src={`${import.meta.env.BASE_URL}/favicon.png`} alt="LOGO CLINICA ANTIOQUIA" className="w-12.5" />
                    <div className="flex flex-col">
                        <span className="text-[13px] tracking-[0.19em]">Clinica</span>
                        <span className="text-[13px] tracking-[0.19em]">Antioquia</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
