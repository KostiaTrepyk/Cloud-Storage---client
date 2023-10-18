import { HTMLMotionProps, motion } from "framer-motion";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageProps {
	containerAttrs?: HTMLAttributes<HTMLDivElement>;
	imgAttrs?: HTMLMotionProps<"img">;
	loaderAttrs?: HTMLMotionProps<"div">;
}

const Image: React.FC<ImageProps> = ({ imgAttrs }) => {
	const [isImageLoading, setIsIamgeLoading] = useState<boolean>(true);
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
	/* const [isImageError, setIsImageError] = useState<boolean>(false); */

	function imageOnLoadHandler(
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) {
		imgAttrs && imgAttrs.onLoad && imgAttrs.onLoad(e);

		setIsImageLoaded(true);
		setIsIamgeLoading(false);
		/* 	setIsImageError(false); */
	}

	function imageOnErrorHandler(
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) {
		imgAttrs && imgAttrs.onError && imgAttrs.onError(e);

		setIsImageLoaded(false);
		setIsIamgeLoading(false);
		/* setIsImageError(true); */
	}

	return (
		<div className="relative aspect-square h-full">
			<motion.img
				initial={{ opacity: 0 }}
				animate={isImageLoaded && { opacity: 1 }}
				loading="lazy"
				decoding="async"
				{...imgAttrs}
				onLoad={imageOnLoadHandler}
				onError={imageOnErrorHandler}
				className={twMerge(
					`mx-auto h-full max-h-full max-w-full rounded-sm object-contain ${
						isImageLoading && "invisible"
					}`,
					imgAttrs && imgAttrs.className
				)}
			/>
			{isImageLoading && (
				<motion.div
					className="absolute left-0 top-0 h-full w-full animate-pulse rounded-sm border border-neutral-100 bg-neutral-100"
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.15, delay: 0.15 }}
				></motion.div>
			)}
		</div>
	);
};
export default Image;
