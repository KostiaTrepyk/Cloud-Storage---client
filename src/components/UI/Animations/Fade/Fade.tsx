import { type HTMLMotionProps, type Variants, motion } from "framer-motion";

const fadeAnimation: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

interface FadeProps extends HTMLMotionProps<"div"> {
	/** @default 0.3 */
	duration?: number;
	/** @default 0 */
	delay?: number;
}

const Fade: React.FC<FadeProps> = ({
	duration = 0.3,
	delay = 0,
	children,
	...motionDivAttrs
}) => {
	return (
		<motion.div
			initial={"initial"}
			animate={"animate"}
			variants={fadeAnimation}
			transition={{
				duration,
				delay,
			}}
			{...motionDivAttrs}
		>
			{children}
		</motion.div>
	);
};

export default Fade;