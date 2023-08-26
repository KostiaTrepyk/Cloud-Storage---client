import { Variants } from "framer-motion";

export const buttonVariants: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	reveal: (custom) => ({
		opacity: 1,
		scale: 1,
		transition: { delay: 0.05 * custom },
	}),
};
export const inputVariants: Variants = {
	initial: { opacity: 0 },
	reveal: (custom) => ({
		opacity: 1,
		transition: { delay: 0.05 * custom },
	}),
};