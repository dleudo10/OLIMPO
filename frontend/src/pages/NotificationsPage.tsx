import { NotificationItem, type Notification } from "../components/common/NotificationItem";
import { PageHeader } from "../components/common/PageHeader";

import {
    Plane,
    WalletCards,
    Landmark,
    CircleCheck,
} from "lucide-react";

type NotificationGroup = {
    label: string;
    notifications: Notification[];
};

const notificationGroups: NotificationGroup[] = [
    {
        label: "HOY",
        notifications: [
            {
                id: "1",
                source: "THEMIS",
                title: "Nuevo consentimiento disponible",
                description:
                "Se ha registrado un nuevo consentimiento informado para revisión.",
                time: "Hace 5 minutos",
                isNew: true,
                isUnread: true,
                icon: Plane,
            },
            {
                id: "2",
                source: "NEMESIS",
                title: "Actualización de cartera",
                description:
                "Se actualizaron los indicadores de gestión de cartera del período.",
                time: "Hace 1 hora",
                isNew: true,
                isUnread: true,
                icon: WalletCards,
            },
            {
                id: "3",
                source: "OLIMPO",
                title: "Mantenimiento programado",
                description:
                "El ecosistema estará en mantenimiento el próximo sábado de 2 a 4 a.m.",
                time: "Hace 3 horas",
                isNew: true,
                isUnread: true,
                icon: Landmark,
            },
        ],
    },
    {
        label: "AYER",
        notifications: [
            {
                id: "4",
                source: "ATHENA",
                title: "Nueva actualización disponible",
                description:
                "Hay una nueva actualización disponible para tu plataforma.",
                time: "Ayer, 4:32 p.m.",
                isNew: false,
                isUnread: false,
                icon: CircleCheck,
            },
        ],
    },
];

export default function NotificationsPage()  {
    return (
        <main className="min-h-screen bg-[#f4f7fb]">
            <PageHeader
                eyebrow="OLIMPO"
                title="Notificaciones"
                subtitle="Mantente al día"
                description="Aquí encontrarás actualizaciones, alertas y novedades de las aplicaciones del ecosistema Olimpo."
            />

            <section className="mx-auto max-w-290 px-6 py-6 pb-16">

            <div className="space-y-8">
                    {notificationGroups.map((group) => (
                        <section key={group.label}>
                            {/* Fecha */}
                            <h2 className="mb-3 text-[11px] font-semibold tracking-[0.08em] text-slate-400">
                                {group.label}
                            </h2>

                            {/* Notificaciones */}
                            <div className="space-y-2">
                                {group.notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        
        </main>
    )
}
