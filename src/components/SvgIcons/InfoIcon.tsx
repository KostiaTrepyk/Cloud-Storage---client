
import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const InfoIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			fill="none"
			{...svgAttrs}
			ref={ref}
			viewBox="0 0 24 24"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
			></circle>
			<path
				d="M12 17V11"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			></path>
			<circle
				cx="1"
				cy="1"
				r="1.2"
				transform="matrix(1 0 0 -1 11 9)"
				fill="currentColor"
			></circle>
		</svg>
	);
});

export default InfoIcon;