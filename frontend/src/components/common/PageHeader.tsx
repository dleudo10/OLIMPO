import type { ReactNode } from "react";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    description?: string;
    children?: ReactNode;
}

export function PageHeader({
    eyebrow,
    title,
    subtitle,
    description,
    children,
}: PageHeaderProps) {
	return (
		<header className="border-b border-slate-200 bg-white">
			<div className="mx-auto max-w-290 px-6 py-8">
				{eyebrow && (
					<span className="mb-1 block text-[12px] font-bold tracking-[4px] text-brand-700">
						{eyebrow}
					</span>
				)}

				<h1 className="text-[28px] font-bold leading-tight text-[#073b70]">
					{title}
				</h1>

				{subtitle && (
					<p className="mt-1.5 text-slate-500">
						{subtitle}
					</p>
				)}

				{description && (
					<p className="mt-3 leading-relaxed text-slate-500">
						{description}
					</p>
				)}

				<div className="mt-5 flex items-center gap-2">
					<span className="h-0.5 w-10 bg-brand-700" />

					<span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
					<span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
					<span className="h-1.5 w-1.5 rounded-full bg-brand-100" />
				</div>

				{children}
			</div>
		</header>
	);
}
