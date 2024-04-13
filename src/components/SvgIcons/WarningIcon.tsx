
import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const WarningIcon = forwardRef<SVGSVGElement, Props>(({ ...svgAttrs }, ref) => {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...svgAttrs}
			viewBox="1 1 22 22"
			xmlns="http://www.w3.org/2000/svg"
			ref={ref}
		>
			<path d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z"></path>
		</svg>
	);
});

export default WarningIcon;
