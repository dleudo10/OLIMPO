import { ArrowRight, Star } from "lucide-react";
import type { ReactNode } from "react";

export type ApplicationStatus =
    | "available"
    | "soon"
    | "new";

export interface Application {
    id: string;
    name: string;
    category: string;
    description: string;
    status: ApplicationStatus;
    icon: ReactNode;
    href?: string;
}

interface ApplicationCardProps {
    application: Application;
}

export function ApplicationCard({
    application,
}: ApplicationCardProps) {
    const {
        name,
        category,
        description,
        status,
        icon,
        href,
    } = application;

    const isAvailable = status === "available";

    const statusLabel = {
        available: "Disponible",
        soon: "Próximamente",
        new: "Nueva",
    }[status];

    const card = (
        <article
            className={[
                "group flex min-h-67.5 flex-col rounded-2xl",
                "border border-slate-200 bg-white p-6",
                "transition-all duration-200",
                isAvailable
                ? "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-slate-200/50"
                : "",
            ].join(" ")}
        >
            {/* TOP */}
            <div className="flex items-start justify-between">
                {/* Icon */}
                <div className="flex h-10.5 w-10.5 items-center justify-center rounded-xl bg-slate-100 text-brand-600">
                    {icon}
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5">
                    {status === "new" && (
                        <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-medium text-white">
                            Nueva
                        </span>
                    )}

                    <span
                        className={[
                        "rounded-full px-2.5 py-1 text-[10px] font-medium",
                        status === "available"
                            ? "border border-brand-200 bg-brand-50 text-brand-700"
                            : "bg-slate-50 text-slate-400",
                        ].join(" ")}
                    >
                        {statusLabel}
                    </span>

                    <button
                        type="button"
                        aria-label={`Agregar ${name} a favoritos`}
                        className="ml-1 text-slate-300 transition-colors hover:text-brand-600"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                    >
                        <Star
                            size={19}
                            strokeWidth={1.5}
                        />
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mt-4.5 flex-1">
                <h2 className="text-[15px] font-bold tracking-[1px] text-slate-500">
                    {name}
                </h2>

                <span className="mt-1 block text-[14px] text-slate-500">
                    {category}
                </span>

                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
                    {description}
                </p>

                <span className="mt-4 inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-400">
                    {category}
                </span>
            </div>

            {/* ACTION */}
            <div
                className={[
                    "mt-4 flex h-10.25 items-center justify-center rounded-xl",
                    "text-[13px] font-semibold",
                    isAvailable
                        ? "bg-brand-700 text-white"
                        : "bg-slate-50 text-slate-300",
                ].join(" ")}
            >
                {isAvailable ? (
                    <>
                        Abrir aplicación
                        <ArrowRight
                        size={16}
                        className="ml-2 transition-transform group-hover:translate-x-1"
                        />
                    </>
                ) : (
                    "Próximamente"
                )}
            </div>
        </article>
    );

    if (isAvailable && href) {
        return (
            <a href={href} className="block">
                {card}
            </a>
        );
    }

    return card;
}
