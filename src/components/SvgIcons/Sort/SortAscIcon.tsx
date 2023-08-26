import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const SortAscIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="none"
			ref={ref}
		>
			<path
				d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
});

export default SortAscIcon;
