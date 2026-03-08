interface ContentContainerProps {
	children: React.ReactNode;
	title: string;
	description?: string;
}

function ContentContainer({
	children,
	title,
	description,
}: ContentContainerProps) {
	return (
		<div className="content-container flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<p className="text-2xl font-semibold text-black">{title}</p>
				{description && <p className="text-sm text-muted-foreground">{description}</p>}
			</div>
			{children}
		</div>
	);
}

export { ContentContainer };
