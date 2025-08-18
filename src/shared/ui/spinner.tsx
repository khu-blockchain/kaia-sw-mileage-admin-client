import { cn } from "@shared/lib/style";

function Spinner({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={cn("w-20 h-20 animate-spin", className)}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				xmlns="http://www.w3.org/2000/svg"
				x="1.5"
				y="1.5"
				width="29"
				height="29"
				rx="14.5"
				stroke="#CDD1D5"
				stroke-width="3"
			/>
			<path
				xmlns="http://www.w3.org/2000/svg"
				d="M18.5179 30.2797C15.5023 30.8114 12.3958 30.3748 9.64362 29.0325C6.89142 27.6902 4.63483 25.511 3.19726 22.8073"
				stroke="#535BF2"
				stroke-width="3"
				stroke-linecap="round"
			/>
		</svg>
	);
}

export { Spinner };
