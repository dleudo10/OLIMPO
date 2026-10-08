import {
  Activity,
  BarChart3,
  FileText,
  Radio,
  Wallet,
  Workflow,
} from "lucide-react";
import { ApplicationCard, type Application } from "../components/common/ApplicationCard";
import { PageHeader } from "../components/common/PageHeader";

const applications: Application[] = [
    {
        id: "apollo",
        name: "APOLO",
        category: "Gestión Clínica",
        description:
        "Herramientas para apoyar la gestión asistencial.",
        status: "new",
        icon: <Activity size={22} />,
    },
    {
        id: "argos",
        name: "ARGOS",
        category: "Control y Seguimiento",
        description:
        "Observación, trazabilidad y control de procesos.",
        status: "soon",
        icon: <Radio size={22} />,
    },
    {
        id: "athena",
        name: "ATHENA",
        category: "Analítica e Inteligencia de Negocios",
        description:
        "Datos que ayudan a tomar mejores decisiones.",
        status: "available",
        href: "#",
        icon: <BarChart3 size={22} />,
    },
    {
        id: "clio",
        name: "CLIO",
        category: "Gestión Documental",
        description:
        "Gestión y organización de documentos.",
        status: "soon",
        icon: <FileText size={22} />,
    },
    {
        id: "hermes",
        name: "HERMES",
        category: "Integraciones y Comunicaciones",
        description:
        "Integraciones y herramientas de comunicación.",
        status: "soon",
        icon: <Workflow size={22} />,
    },
    {
        id: "nemesis",
        name: "NEMESIS",
        category: "Gestión de Cartera y Glosas",
        description:
        "Gestión integral de cartera y glosas.",
        status: "available",
        href: "#",
        icon: <Wallet size={22} />,
    },
];

export default function FavoritesPage() {

	return (
		<main className="min-h-screen bg-[#f4f7fb]">
			{/* Header reutilizable */}
			<PageHeader
				eyebrow="OLIMPO"
				title="Mis Favoritos"
				subtitle="Tus aplicaciones esenciales"
				description="Accede rápidamente a las herramientas que utilizas con mayor frecuencia."
			/>

			{/* Applications */}
			<section className="mx-auto max-w-290 px-6 py-6 pb-16">
				{/* Cards */}
				<div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
					{applications.map(
						(application) => (
							<ApplicationCard
								key={application.id}
								application={application}
							/>
						)
					)}
				</div>

				{/* Empty */}
				{applications.length === 0 && (
					<div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
						<h3 className="text-base font-semibold text-slate-700">
							Aun no tienes favoritos
						</h3>

						<p className="mt-2 text-sm text-slate-400">
							Marca tus aplicaciones más utilizadas para acceder rápidamente a ellas desde aquí.
						</p>
					</div>
				)}
			</section>
		</main>
	);
}
