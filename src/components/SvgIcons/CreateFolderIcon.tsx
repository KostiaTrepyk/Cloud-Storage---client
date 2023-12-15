import { forwardRef } from "react";

interface CraeteFolderIconProps extends React.SVGAttributes<SVGSVGElement> {}

const CraeteFolderIcon = forwardRef<SVGSVGElement, CraeteFolderIconProps>(
	(svgAttrs, ref) => {
		return (
			<svg
				fill="currentColor"
				{...svgAttrs}
				viewBox="2 2 20 20"
				xmlns="http://www.w3.org/2000/svg"
				ref={ref}
			>
				<path d="M14 13h-1v-1a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2z"></path>
				<path d="M19.5 7.05h-7L9.87 3.87a1 1 0 0 0-.77-.37H4.5A2.47 2.47 0 0 0 2 5.93v12.14a2.47 2.47 0 0 0 2.5 2.43h15a2.47 2.47 0 0 0 2.5-2.43V9.48a2.47 2.47 0 0 0-2.5-2.43zm.5 11a.46.46 0 0 1-.5.43h-15a.46.46 0 0 1-.5-.43V5.93a.46.46 0 0 1 .5-.43h4.13l2.6 3.18a1 1 0 0 0 .77.37h7.5a.46.46 0 0 1 .5.43z"></path>
			</svg>
		);
	}
);

export default CraeteFolderIcon;