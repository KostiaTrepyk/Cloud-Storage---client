import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	spin?: boolean;
}

const LoadIcon = forwardRef<SVGSVGElement, Props>(
	({ spin = false, ...svgAttrs }, ref) => {
		return (
			<svg
				{...svgAttrs}
				className={twMerge(
					spin && "animate-[spin_2.5s_linear_infinite]",
					svgAttrs.className
				)}
				fill="currentColor"
				viewBox="0 0 24 24"
				ref={ref}
			>
				<circle
					cx="12"
					cy="20"
					r="2"
				></circle>
				<circle
					cx="12"
					cy="4"
					r="2"
				></circle>
				<circle
					cx="6.343"
					cy="17.657"
					r="2"
				></circle>
				<circle
					cx="17.657"
					cy="6.343"
					r="2"
				></circle>
				<circle
					cx="4"
					cy="12"
					r="2.001"
				></circle>
				<circle
					cx="20"
					cy="12"
					r="2"
				></circle>
				<circle
					cx="6.343"
					cy="6.344"
					r="2"
				></circle>
				<circle
					cx="17.657"
					cy="17.658"
					r="2"
				></circle>
			</svg>
		);
	}
);

export default LoadIcon;
