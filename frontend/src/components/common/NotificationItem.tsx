import {
    CircleCheck,
    type LucideIcon,
} from "lucide-react";

export type Notification = {
    id: string;
    source: string;
    title: string;
    description: string;
    time: string;
    isNew?: boolean;
    isUnread?: boolean;
    icon: LucideIcon;
};

export function NotificationItem({
    notification,
}: {
    notification: Notification;
}) {
    const Icon = notification.icon;

    return (
        <div
            className={[
                "group relative rounded-xl border px-5 py-5",
                "border-[#dce8f5] bg-[#f7faff]",
                "transition-all duration-200",
                "hover:border-brand/25 hover:bg-[#f4f8fd]",
                notification.isUnread
                    ? "border-brand/20"
                    : "border-[#e1eaf4]",
            ].join(" ")}
        >
            <div className="flex items-start gap-4">
                {/* Icono + indicador de no leído */}
                <div className="relative flex shrink-0 flex-col items-center">
                    <div
                        className={[
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            "bg-[#eaf2fb]",
                        ].join(" ")}
                    >
                        <Icon
                            className="h-4.25 w-4.25 text-brand-500"
                            strokeWidth={1.7}
                        />
                    </div>

                    {notification.isUnread && (
                        <span
                            className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500"
                            aria-label="No leída"
                        />
                    )}
                </div>

                {/* Contenido */}
                <div className="min-w-0 flex-1">
                    {/* Aplicación + badge */}
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold tracking-[0.06em] text-brand-500">
                            {notification.source}
                        </span>

                        {notification.isNew && (
                            <span
                                className={[
                                    "rounded-full px-2 py-0.5",
                                    "bg-brand-600/8",
                                    "text-[10px] font-medium text-brand-500",
                                ].join(" ")}
                            >
                                Nueva
                            </span>
                        )}
                    </div>

                    {/* Título */}
                    <h3 className="mt-1 text-[16px] font-semibold leading-5 text-slate-900">
                        {notification.title}
                    </h3>

                    {/* Descripción */}
                    <p className="mt-1 text-[13px] leading-5 text-slate-500">
                        {notification.description}
                    </p>

                    {/* Tiempo */}
                    <p className="mt-2.5 text-[11px] font-medium text-slate-400">
                        {notification.time}
                    </p>
                </div>

                {/* Marcar como leída */}
                <button
                    type="button"
                    className={[
                        "shrink-0 rounded-md p-1",
                        "text-slate-400",
                        "transition-colors",
                        "hover:bg-slate-100 hover:text-brand",
                    ].join(" ")}
                    aria-label="Marcar como leída"
                >
                    <CircleCheck
                        className="h-4 w-4"
                        strokeWidth={1.4}
                    />
                </button>
            </div>
        </div>
    );
}