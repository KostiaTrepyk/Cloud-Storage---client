import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const NoSortIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2.5"
			ref={ref}
		>
			<path
				d="M18 6.5L6 6.5"
				stroke="#1C274C"
				strokeLinecap="round"
			></path>
			<path
				d="M24 12H2"
				stroke="#1C274C"
				strokeLinecap="round"
			></path>
			<path
				d="M21 18H4"
				stroke="#1C274C"
				strokeLinecap="round"
			></path>
		</svg>
	);
});

export default NoSortIcon;
