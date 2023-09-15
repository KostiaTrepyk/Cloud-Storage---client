import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	filled?: boolean;
}

const FavouriteIcon = forwardRef<SVGSVGElement, Props>(
	({ filled, ...svgAttrs }, ref) => {
		return (
			<svg
				stroke="currentColor"
				fill={filled ? "currentColor" : "#00000000"}
				{...svgAttrs}
				viewBox="0 0 24 24"
				ref={ref}
			>
				<path d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z"></path>
			</svg>
		);
	}
);

export default FavouriteIcon;
