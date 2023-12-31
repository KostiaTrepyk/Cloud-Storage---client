import { forwardRef, memo } from "react";
import { motion } from "framer-motion";

interface ProgressProps {
	value?: number;
	size?: number;
	showLabel?: boolean;
}

const Progress = memo(
	forwardRef<HTMLDivElement, ProgressProps>(
		({ value = 0, size = 4, showLabel = false }, ref) => {
			return (
				<div
					className="w-full rounded-full bg-gray-200"
					style={{
						paddingInline: size * 2,
					}}
					ref={ref}
				>
					<motion.div
						initial={{
							width: 0,
							opacity: -0.25,
						}}
						animate={{
							width: `${value}%`,
							opacity: 1,
						}}
						transition={{
							duration: 1,
							damping: 10,
							type: "spring",
							stiffness: 25,
						}}
						className="relative box-content flex max-w-full items-center justify-end rounded-full bg-rose-600"
						style={{
							height: size * 2,
							paddingInline: size * 2,
							paddingBlock: size,
							left: -size * 2,
						}}
					>
						{showLabel && (
							<span className="absolute -right-1 -top-3.5 text-xs font-bold leading-none text-rose-600">
								{value}%
							</span>
						)}
						<div className="relative aspect-square h-[75%] translate-x-1/2 rounded-full bg-rose-900"></div>
					</motion.div>
				</div>
			);
		}
	)
);

export default Progress;
