import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props
	extends React.DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		PropsWithChildren {}

const Button: FC<Props> = ({ children, ...buttonAtributes }) => {
	return (
		<button
			{...buttonAtributes}
			className={twMerge(
				"min-w-[5rem] rounded bg-rose-600 p-2 font-semibold text-white transition hover:bg-rose-700 active:bg-rose-800 disabled:bg-neutral-600",
				buttonAtributes.className
			)}
		>
			{children}
		</button>
	);
};

export default Button;
