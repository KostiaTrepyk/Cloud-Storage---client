import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import IconButton from "../Buttons/IconButton/IconButton";

import CloseIcon from "../../SvgIcons/CloseIcon";

interface ModalProps extends PropsWithChildren {
	open?: boolean;
	onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ open = false, onClose, children }) => {
	const portalContainer = document.getElementById("modal");

	if (!portalContainer) {
		throw new Error('No portal container in "Modal.tsx"!');
	}

	if (!open) return null;

	return createPortal(
		<motion.div
			className="fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onClick={onClose}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-5/6 max-w-sm rounded-md bg-white p-7 shadow-lg sm:w-2/3 sm:max-w-xl sm:p-8"
			>
				<IconButton
					className="absolute -right-0 -top-0 h-6 rounded border-0  hover:text-red-600 sm:h-7"
					onClick={onClose}
					color="light"
					aria-label="Close modal"
				>
					<CloseIcon />
				</IconButton>

				{children}
			</div>
		</motion.div>,
		portalContainer
	);
};

export default Modal;
