import { Search } from "lucide-react";

export type ApplicationFilter =
    | "all"
    | "available"
    | "soon"
    | "favorites";

interface ApplicationsToolbarProps {
    search: string;
    activeFilter: ApplicationFilter;
    onSearchChange: (value: string) => void;
    onFilterChange: (filter: ApplicationFilter) => void;
}

const filters: {id: ApplicationFilter; label: string;}[] = [
    {
        id: "all",
        label: "Todas",
    },
    {
        id: "available",
        label: "Disponibles",
    },
    {
        id: "soon",
        label: "Próximamente",
    },
    {
        id: "favorites",
        label: "Favoritos",
    },
];

export function ApplicationsToolbar({
    search,
    activeFilter,
    onSearchChange,
    onFilterChange,
}: ApplicationsToolbarProps) {
    return (
        <div className="mb-7 flex items-center gap-3 max-lg:flex-col max-lg:items-stretch">
            {/* Search */}
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
                <Search
                    size={17}
                    strokeWidth={1.7}
                    className="shrink-0 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    placeholder="Buscar aplicación..."
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    className="w-full border-0 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
                {filters.map((filter) => {
                    const isActive =
                        activeFilter === filter.id;

                    return (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() =>
                                onFilterChange(filter.id)
                            }
                            className={[
                                "h-10.5 shrink-0 rounded-xl border px-4",
                                "text-xs transition-colors",
                                isActive
                                ? "border-brand-700 bg-brand-700 font-semibold text-white"
                                : "border-slate-200 bg-white text-slate-500 hover:border-brand-300 hover:text-brand-700",
                            ].join(" ")}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
