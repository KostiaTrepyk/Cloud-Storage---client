import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const NoSortIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="none"
			ref={ref}
		>
			<g
				stroke="currentColor"
				strokeWidth="2.2"
			>
				<path
					d="M10 7L2 7"
					strokeLinecap="round"
				></path>
				<path
					d="M8 12H2"
					strokeLinecap="round"
				></path>
				<path
					d="M10 17H2"
					strokeLinecap="round"
				></path>
				<circle
					cx="17"
					cy="12"
					r="5"
				></circle>
				<path
					d="M17 10V11.8462L18 13"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
			</g>
		</svg>
	);
});

export default NoSortIcon;
