import { motion } from "framer-motion";

interface ContextMenuContainerProps extends React.PropsWithChildren {}

const ContextMenuContainer: React.FC<ContextMenuContainerProps> = ({
	children,
}) => {
	return (
		<motion.ul
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex min-w-[17.5rem] flex-col gap-1 rounded-md bg-neutral-500 p-2"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			{children}
		</motion.ul>
	);
};

export default ContextMenuContainer;
