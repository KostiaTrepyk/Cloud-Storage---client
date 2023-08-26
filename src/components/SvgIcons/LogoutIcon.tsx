import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const LogoutIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 24 24"
			fill="none"
			ref={ref}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
			></path>
		</svg>
	);
});

export default LogoutIcon;
