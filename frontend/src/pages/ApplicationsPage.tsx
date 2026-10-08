import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  FileText,
  Radio,
  Wallet,
  Workflow,
} from "lucide-react";
import { ApplicationCard, type Application } from "../components/common/ApplicationCard";
import { ApplicationsToolbar, type ApplicationFilter } from "../components/common/ApplicationsToolbar";
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
    status: "soon",
    href: "#",
    icon: <BarChart3 size={22} />,
  },
  {
    id: "themis",
    name: "THEMIS",
    category: "Gestión Documental",
    description:
      "Gestión y organización de documentos digitalizados.",
    status: "available",
	href: "http://localhost:5173/consentca/",
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
//   {
//     id: "nemesis",
//     name: "NEMESIS",
//     category: "Gestión de Cartera y Glosas",
//     description:
//       "Gestión integral de cartera y glosas.",
//     status: "available",
//     href: "#",
//     icon: <Wallet size={22} />,
//   },
];

export default function ApplicationsPage() {
	const [search, setSearch] = useState("");
	const [activeFilter, setActiveFilter] =
		useState<ApplicationFilter>("all");

	const filteredApplications = useMemo(() => {
		const query = search.trim().toLowerCase();

		return applications.filter((application) => {
			const matchesSearch =
				!query ||
				application.name
				.toLowerCase()
				.includes(query) ||
				application.category
				.toLowerCase()
				.includes(query) ||
				application.description
				.toLowerCase()
				.includes(query);

			let matchesFilter = true;

			switch (activeFilter) {
				case "available":
					matchesFilter =
						application.status === "available";
					break;

				case "soon":
					matchesFilter =
						application.status === "soon" ||
						application.status === "new";
					break;

				case "favorites":
					// Aquí conectarías tu lógica real de favoritos.
					matchesFilter = false;
					break;

				case "all":
					default:
						matchesFilter = true;
			}

			return matchesSearch && matchesFilter;
		});
	}, [search, activeFilter]);

	return (
		<main className="min-h-screen bg-[#f4f7fb]">
			{/* Header reutilizable */}
			<PageHeader
				eyebrow="OLIMPO"
				title="Aplicaciones"
				subtitle="Todas las soluciones de Olimpo"
				description="Explora las aplicaciones, plataformas y herramientas que forman parte del ecosistema digital de Clínica Antioquia."
			/>

			{/* Applications */}
			<section className="mx-auto max-w-290 px-6 py-6 pb-16">
				<ApplicationsToolbar
					search={search}
					activeFilter={activeFilter}
					onSearchChange={setSearch}
					onFilterChange={setActiveFilter}
				/>

				{/* Counter */}
				<p className="mb-4 text-xs text-slate-400">
					{filteredApplications.length}{" "}
					{filteredApplications.length === 1
						? "aplicación encontrada"
						: "aplicaciones encontradas"}
				</p>

				{/* Cards */}
				<div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
					{filteredApplications.map(
						(application) => (
							<ApplicationCard
								key={application.id}
								application={application}
							/>
						)
					)}
				</div>

				{/* Empty */}
				{filteredApplications.length === 0 && (
					<div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
						<h3 className="text-base font-semibold text-slate-700">
							No encontramos aplicaciones
						</h3>

						<p className="mt-2 text-sm text-slate-400">
							Intenta modificar tu búsqueda o seleccionar
							otro filtro.
						</p>
					</div>
				)}
			</section>
		</main>
	);
}
