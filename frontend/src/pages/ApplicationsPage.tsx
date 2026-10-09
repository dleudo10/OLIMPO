import { useMemo, useState } from "react";
import { ApplicationCard } from "../components/common/ApplicationCard";
import { ApplicationsToolbar, type ApplicationFilter } from "../components/common/ApplicationsToolbar";
import { PageHeader } from "../components/common/PageHeader";
import { useGetApplications } from "../hooks/applications/useGetApplications";

export default function ApplicationsPage() {
	// 1. Extraemos las variables de control de TanStack Query
	const { data: response, isLoading, isError, error } = useGetApplications();

	const [search, setSearch] = useState("");
	const [activeFilter, setActiveFilter] = useState<ApplicationFilter>("all");

	const applicationsList = response?.data || [];
	console.log("ApplicationsPage - applicationsList:", applicationsList); // Log the applications list for debugging

	const filteredApplications = useMemo(() => {
		const query = search.trim().toLowerCase();

		// Si no hay lista todavía, devolvemos un array vacío de forma segura
		if (!applicationsList || !Array.isArray(applicationsList)) return [];

		return applicationsList.filter((app) => {
			const matchesSearch =
				!query ||
				app.application.name?.toLowerCase().includes(query) ||
				app.application.category?.toLowerCase().includes(query) ||
				app.application.description?.toLowerCase().includes(query);

			let matchesFilter = true;

			switch (activeFilter) {
				case "available":
					matchesFilter = app.application.status === "available";
					break;
				case "soon":
					matchesFilter = app.application.status === "soon" || app.application.status === "new";
					break;
				case "favorites":
					// TODO: Implementar lógica de favoritos aquí (ej. application.is_favorite)
					matchesFilter = false;
					break;
				case "all":
				default:
					matchesFilter = true;
			}

			return matchesSearch && matchesFilter;
		});
	}, [applicationsList, search, activeFilter]);

	return (
		<main className="min-h-screen bg-[#f4f7fb]">
			<PageHeader
				eyebrow="OLIMPO"
				title="Aplicaciones"
				subtitle="Todas las soluciones de Olimpo"
				description="Explora las aplicaciones, plataformas y herramientas que forman parte del ecosistema digital de Clínica Antioquia."
			/>

			<section className="mx-auto max-w-290 px-6 py-6 pb-16">
				<ApplicationsToolbar
					search={search}
					activeFilter={activeFilter}
					onSearchChange={setSearch}
					onFilterChange={setActiveFilter}
				/>

				{/* 3. Control de Estado: Cargando */}
				{isLoading && (
					<div className="py-16 text-center">
						<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-700 border-r-transparent alignment-middle"></div>
						<p className="mt-4 text-sm text-slate-500">Cargando aplicaciones...</p>
					</div>
				)}

				{/* 4. Control de Estado: Error en API */}
				{isError && (
					<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
						<h3 className="text-base font-semibold text-red-700">Hubo un problema al conectar</h3>
						<p className="mt-1 text-sm text-red-500">
							{error instanceof Error ? error.message : "Error desconocido de red."}
						</p>
					</div>
				)}

				{/* 5. Renderizado Condicional de la lista cuando la carga es exitosa */}
				{!isLoading && !isError && (
					<>
						{/* Counter */}
						<p className="mb-4 text-xs text-slate-400">
							{filteredApplications.length}{" "}
							{filteredApplications.length === 1
								? "aplicación encontrada"
								: "aplicaciones encontradas"}
						</p>

						{/* Cards */}
						<div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
							{filteredApplications.map((app) => (
								<ApplicationCard
									key={app.id}
									application={app.application}
									role={app.role}
								/>
							))}
						</div>

						{/* Empty State */}
						{filteredApplications.length === 0 && (
							<div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
								<h3 className="text-base font-semibold text-slate-700">
									No encontramos aplicaciones
								</h3>
								<p className="mt-2 text-sm text-slate-400">
									Intenta modificar tu búsqueda o seleccionar otro filtro.
								</p>
							</div>
						)}
					</>
				)}
			</section>
		</main>
	);
}