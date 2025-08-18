import { cn } from "@shared/lib/style";

interface PageLayoutProps {
	index: string;
	title: string;
	description: string;
	children: React.ReactNode;
	className?: string;
}

export default function PageLayout({
	index,
	title,
	children,
	description,
	className,
}: PageLayoutProps) {
	return (
		<article
			className={cn("flex flex-col gap-6 w-full max-w-[1200px]", className)}
		>
			<div className="flex flex-col gap-2">
				<header className="flex flex-col gap-2">
					<p className="text-sm text-index font-semibold">{index}</p>
					<p className="text-3xl font-semibold">{title}</p>
				</header>
				<p className="text-sm text-body whitespace-pre-wrap leading-relaxed">
					{description}
				</p>
			</div>
			{children}
		</article>
	);
}
