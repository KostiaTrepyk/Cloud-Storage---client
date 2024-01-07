import { forwardRef, memo } from "react";
import { motion } from "framer-motion";

interface ProgressProps {
	/** @default 0  */
	value?: number;

	/** @default 4  */
	height?: number;

	/** @default false  */
	showLabel?: boolean;
}

const Progress = memo(
	forwardRef<HTMLDivElement, ProgressProps>(
		({ value = 0, height = 4, showLabel = false }, ref) => {
			return (
				<div
					className="w-full rounded-full bg-gray-200"
					style={{
						paddingInline: height * 2,
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
							height: height * 2,
							paddingInline: height * 2,
							paddingBlock: height,
							left: -height * 2,
						}}
					>
						{showLabel && (
							<span
								className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold leading-none transition-all ${
									value > 30
										? "text-white"
										: "translate-x-full text-rose-600"
								}`}
								style={{
									right:
										value > 30
											? (height + 1) * 3 + "px"
											: "-4px",
								}}
							>
								{value.toFixed(0)}%
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
