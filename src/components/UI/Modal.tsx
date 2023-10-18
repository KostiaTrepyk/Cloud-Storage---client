import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import IconButton from "./Buttons/IconButton";

import CloseIcon from "../SvgIcons/CloseIcon";

interface ModalProps {
	open?: boolean;
	close?: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
	open = false,
	close,
	children,
}) => {
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
			onClick={close}
		>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className="relative min-h-[10rem] w-2/3 min-w-[16rem] max-w-2xl rounded-md bg-white p-4 shadow-lg md:p-8"
			>
				<IconButton
					className="absolute -right-2 -top-2 h-8 text-black hover:text-red-600 sm:h-10"
					onClick={close}
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
