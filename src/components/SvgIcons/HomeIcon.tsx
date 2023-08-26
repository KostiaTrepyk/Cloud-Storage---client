import { forwardRef } from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {}

const HomeIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			viewBox="0 0 64 64"
			fill="currentColor"
			ref={ref}
		>
			<path d="M56.87 25.981L50.27 21.031L47.27 18.781L35.57 10.001C34.4423 9.16327 33.0748 8.71094 31.67 8.71094C30.2652 8.71094 28.8977 9.16327 27.77 10.001L21.67 14.581V14.371C21.6684 13.8411 21.4572 13.3333 21.0825 12.9586C20.7077 12.5838 20.1999 12.3726 19.67 12.371H12.47C11.9396 12.371 11.4309 12.5817 11.0558 12.9568C10.6807 13.3319 10.47 13.8406 10.47 14.371V23.161L6.44002 26.291C6.23227 26.4524 6.05838 26.6531 5.92833 26.8817C5.79827 27.1103 5.71459 27.3624 5.68208 27.6234C5.64957 27.8844 5.66888 28.1493 5.73887 28.4028C5.80887 28.6564 5.92819 28.8936 6.09001 29.101C6.276 29.3427 6.51546 29.538 6.7896 29.6716C7.06373 29.8052 7.36505 29.8734 7.67 29.871C8.11211 29.8709 8.54152 29.7231 8.89 29.451L10.47 28.231V48.281C10.4716 50.0044 11.1569 51.6568 12.3756 52.8755C13.5942 54.0941 15.2466 54.7794 16.97 54.781H25.6C25.9594 54.7808 26.3121 54.6831 26.6203 54.4981C26.9285 54.3132 27.1807 54.0481 27.35 53.731C27.5142 53.4413 27.6003 53.114 27.6 52.781C27.6017 52.7109 27.5983 52.6407 27.59 52.571V46.851C27.5916 45.7703 28.0223 44.7345 28.7874 43.9713C29.5525 43.2081 30.5893 42.7799 31.67 42.781C32.7491 42.7821 33.7837 43.2112 34.5468 43.9742C35.3098 44.7373 35.7389 45.7719 35.74 46.851V52.781C35.7397 53.114 35.8259 53.4413 35.99 53.731C36.1624 54.0477 36.4167 54.3122 36.7263 54.4969C37.0359 54.6816 37.3895 54.7797 37.75 54.781H46.37C48.0929 54.7776 49.7442 54.0917 50.9624 52.8734C52.1807 51.6552 52.8666 50.0039 52.87 48.281V27.981L54.47 29.181C54.8129 29.4398 55.2305 29.5801 55.66 29.581C55.9718 29.5802 56.2792 29.5076 56.5584 29.3689C56.8376 29.2301 57.081 29.029 57.27 28.781C57.5883 28.3567 57.7249 27.8233 57.6499 27.2982C57.5749 26.7731 57.2944 26.2993 56.87 25.981Z"></path>
		</svg>
	);
});

export default HomeIcon;
