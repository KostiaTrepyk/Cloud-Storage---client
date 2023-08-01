import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props
	extends React.DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		PropsWithChildren {}

const IconButton: FC<Props> = ({ children, ...buttonAtributes }) => {
	return (
		<button
			{...buttonAtributes}
			className={twMerge(
				"aspect-square h-full rounded-full border border-neutral-300 p-[0.65rem] duration-300 hover:bg-[#7772] active:bg-[#7774]",
				buttonAtributes.className
			)}
		>
			{children}
		</button>
	);
};

export default IconButton;
