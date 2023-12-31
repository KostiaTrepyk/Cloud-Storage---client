import { type HTMLMotionProps, type Variants, motion } from "framer-motion";

const fadeAnimation: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

interface FadeProps extends HTMLMotionProps<"div"> {}

const Fade: React.FC<FadeProps> = ({ children, ...motionDivAttrs }) => {
	return (
		<motion.div
			initial={"initial"}
			animate={"animate"}
			variants={fadeAnimation}
			{...motionDivAttrs}
		>
			{children}
		</motion.div>
	);
};

export default Fade;