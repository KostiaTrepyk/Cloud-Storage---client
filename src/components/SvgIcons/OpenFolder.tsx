import { forwardRef } from "react";

interface OpenFolderIconProps extends React.SVGAttributes<SVGSVGElement> {
	spin?: boolean;
}

const OpenFolderIcon = forwardRef<SVGSVGElement, OpenFolderIconProps>(
	({ spin = false, ...svgAttrs }, ref) => {
		return (
			<svg
				fill="currentColor"
				{...svgAttrs}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				ref={ref}
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1 5C1 3.34315 2.34315 2 4 2H8.55848C9.84977 2 10.9962 2.82629 11.4045 4.05132L11.7208 5H20C21.1046 5 22 5.89543 22 7V9.00961C23.1475 9.12163 23.9808 10.196 23.7695 11.3578L22.1332 20.3578C21.9603 21.3087 21.132 22 20.1654 22H3C1.89543 22 1 21.1046 1 20V5ZM20 9V7H11.7208C10.8599 7 10.0956 6.44914 9.82339 5.63246L9.50716 4.68377C9.37105 4.27543 8.98891 4 8.55848 4H4C3.44772 4 3 4.44772 3 5V12.2709L3.35429 10.588C3.54913 9.66249 4.36562 9 5.31139 9H20ZM3.36634 20C3.41777 19.9109 3.4562 19.8122 3.47855 19.706L5.31139 11L21 11H21.8018L20.1654 20L3.36634 20Z"
				></path>
			</svg>
		);
	}
);

export default OpenFolderIcon;
