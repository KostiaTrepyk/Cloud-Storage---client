import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const MenuIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			fill="none"
			viewBox="0 0 24 24"
			ref={ref}
		>
			<path
				d="M4 6H20M4 12H20M4 18H20"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
});

export default MenuIcon;
