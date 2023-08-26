import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const CloseIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="currentColor"
			ref={ref}
		>
			<g
				stroke="none"
				strokeWidth="2.5"
				fill="none"
				fillRule="evenodd"
			>
				<line
					x1="18"
					y1="6"
					x2="6"
					y2="18"
					id="Path"
					stroke="currentColor"
					strokeLinecap="round"
				></line>
				<line
					x1="6"
					y1="6"
					x2="18"
					y2="18"
					id="Path"
					stroke="currentColor"
					strokeLinecap="round"
				></line>
			</g>
		</svg>
	);
});

export default CloseIcon;
