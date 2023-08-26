import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const ArrowRightIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			fill="currentColor"
			viewBox="0 0 32 32"
			ref={ref}
		>
			<path d="M5.975 17.504l14.287.001-6.367 6.366L16.021 26l10.004-10.003L16.029 6l-2.128 2.129 6.367 6.366H5.977z"></path>
		</svg>
	);
});

export default ArrowRightIcon;
