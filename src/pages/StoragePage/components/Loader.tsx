import { motion } from "framer-motion"

import LoadIcon from "components/SvgIcons/LoadIcon"

const Loader = () => {
	return (
		<motion.div
			className="absolute left-[50%] top-16 z-10 aspect-square h-10 -translate-x-1/2 rounded-full bg-white p-1.5"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<LoadIcon
				className="h-full"
				spin
			/>
		</motion.div>
	);
};

export default Loader;