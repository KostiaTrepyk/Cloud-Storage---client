import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const DangerIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			fill="none"
			{...svgAttrs}
			ref={ref}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
			></circle>
			<path
				d="M12 7V13"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			></path>
			<circle
				cx="12"
				cy="16"
				r="1.2"
				fill="currentColor"
			></circle>
		</svg>
	);
});

export default DangerIcon;