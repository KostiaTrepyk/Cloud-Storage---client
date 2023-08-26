import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const SortDescIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="none"
			ref={ref}
		>
			<path
				d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
});

export default SortDescIcon;
