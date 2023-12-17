import { Variants, motion } from "framer-motion";

const fadeAnimation: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

interface FadeProps extends React.PropsWithChildren {}

const Fade: React.FC<FadeProps> = ({ children }) => {
	return (
		<motion.div
			initial={"initial"}
			animate={"animate"}
			variants={fadeAnimation}
		>
			{children}
		</motion.div>
	);
};

export default Fade;