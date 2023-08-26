import { SVGAttributes, forwardRef } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {}

const LoadingProfileIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	return (
		<svg
			{...svgAttrs}
			fill="currentColor"
			viewBox="0 0 1000 1000"
			ref={ref}
		>
			<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
				<path d="M1793.9,4983.6c-32.5-34.5-32.5-74.6-11.5-643.1c23-570.4,21.1-606.8-9.6-641.2c-45.9-51.7-65.1-49.8-222,28.7c-139.7,70.8-193.3,74.6-225.9,11.5c-13.4-23,17.2-201,107.2-606.8l126.3-572.3l11.5-660.3l13.4-660.4l90-254.6c212.5-597.2,486.2-980,907.3-1259.4c91.9-61.3,170.4-112.9,170.4-112.9c1.9,0-3.8-47.9-15.3-107.2l-19.1-107.2l-289-11.5c-193.3-5.7-327.3-21.1-396.2-42.1c-164.6-51.7-359.8-162.7-480.4-271.8C1403.4-1064.8,471.3-2289.8,379.4-2467.8c-120.6-235.4-132.1-312-124.4-872.8c5.7-478.5,7.7-495.8,57.4-631.6c109.1-300.5,323.5-541.7,601-675.7c84.2-40.2,168.4-74.7,185.7-74.7c28.7,0,32.5,40.2,32.5,436.4c0,503.4,7.7,535.9,155,612.5c132.1,68.9,266,30.6,342.6-97.6c34.4-55.5,38.3-99.5,38.3-534V-4780h1885.4h1885.4v474.7c0,434.5,3.8,478.5,38.3,534c74.6,124.4,201,162.7,333,103.3c158.9-68.9,164.6-91.9,164.6-637.4v-472.8l72.7,11.5c124.4,17.2,354.1,101.4,465.1,170.3c225.9,135.9,434.5,415.4,524.5,696.7c49.8,157,63.2,847.9,21,1071.9c-36.3,197.1-126.3,390.5-260.3,557l-101.4,128.3l-231.6-9.6c-279.5-13.4-453.6,11.5-706.3,97.6c-459.4,156.9-826.9,486.2-1048.9,939.8c-132.1,273.7-178,472.8-178,794.3c0,313.9,44,513,170.3,780.9c185.7,390.5,511,717.8,882.4,886.2l122.5,55.5v847.9c-1.9,951.3-11.5,1052.7-122.5,1280.5c-151.2,312-419.2,534-748.4,618.2c-91.9,23-258.4,28.7-870.9,28.7l-756.1,1.9l-172.3,220.1c-93.8,122.5-191.4,235.4-214.4,250.7c-40.2,26.8-49.8,26.8-91.9-1.9c-26.8-17.2-47.9-42.1-47.9-57.4c0-38.3-65.1-88-112.9-88c-26.8,0-160.8,97.6-359.9,258.4C2037,4903.2,1878.1,5020,1860.9,5020C1841.8,5020,1811.1,5002.8,1793.9,4983.6z"></path>{" "}
				<path d="M6203.9,100.9c-189.5-65.1-344.5-281.4-344.5-478.5c0-101.4,57.4-243.1,134-331.1c204.8-233.5,551.3-237.3,756.1-9.6c97.6,105.3,130.1,193.3,132.1,340.7c0,223.9-147.4,424.9-357.9,488.1C6397.2,146.8,6332.1,146.8,6203.9,100.9z"></path>{" "}
				<path d="M7647.1,104.7c-436.4-151.2-468.9-742.7-49.8-945.6c107.2-51.7,302.4-57.4,407.7-11.5c348.4,149.3,417.3,618.2,128.3,865.2c-84.2,72.7-227.8,126.3-329.2,126.3C7771.5,137.2,7700.7,121.9,7647.1,104.7z"></path>{" "}
				<path d="M9119,121.9c-162.7-42.1-304.3-170.4-359.8-325.4c-124.4-356,183.7-735,551.3-679.5c402,63.2,574.2,532.1,310.1,846C9515.2,87.5,9277.9,162.1,9119,121.9z"></path>{" "}
			</g>
		</svg>
	);
});

export default LoadingProfileIcon;
