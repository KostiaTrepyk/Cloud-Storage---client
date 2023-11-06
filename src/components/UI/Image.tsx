import { HTMLMotionProps, motion } from "framer-motion";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import NoImageIcon from "../SvgIcons/NoImageIcon";

interface ImageProps {
	containerAttrs?: HTMLAttributes<HTMLDivElement>;
	imgAttrs?: HTMLMotionProps<"img">;
}

const Image: React.FC<ImageProps> = ({ imgAttrs, containerAttrs }) => {
	const [isImageLoading, setIsIamgeLoading] = useState<boolean>(true);
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
	const [isImageError, setIsImageError] = useState<boolean>(false);

	function imageOnLoadHandler(
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) {
		imgAttrs && imgAttrs.onLoad && imgAttrs.onLoad(e);

		setIsImageLoaded(true);
		setIsIamgeLoading(false);
		setIsImageError(false);
	}

	function imageOnErrorHandler(
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) {
		imgAttrs && imgAttrs.onError && imgAttrs.onError(e);

		setIsImageLoaded(false);
		setIsIamgeLoading(false);
		setIsImageError(true);
	}

	if (isImageError)
		return (
			<div className="aspect-square h-full">
				<NoImageIcon className="scale-50" />
			</div>
		);

	return (
		<div
			{...containerAttrs}
			className={twMerge(
				"relative aspect-square h-full max-w-full",
				containerAttrs?.className
			)}
		>
			<motion.img
				initial={{ opacity: 0 }}
				animate={isImageLoaded && { opacity: 1 }}
				loading="lazy"
				decoding="async"
				{...imgAttrs}
				onLoad={imageOnLoadHandler}
				onError={imageOnErrorHandler}
				className={twMerge(
					`mx-auto h-full rounded-sm object-contain ${
						isImageLoading && "invisible"
					}`,
					imgAttrs && imgAttrs.className
				)}
			/>
			{isImageLoading && (
				<motion.div
					className={twMerge(
						"absolute left-0 top-0 h-full w-full animate-pulse rounded-sm border border-neutral-100 bg-neutral-100"
					)}
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.15, delay: 0.15 }}
				></motion.div>
			)}
		</div>
	);
};
export default Image;
