import { FC, InputHTMLAttributes } from "react";
import {twMerge} from 'tailwind-merge'

interface Props
	extends React.DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: string;
}

const Input: FC<Props> = ({ label, ...inputAttributes }) => {
	return (
		<label className="grid gap-1">
			<span>{label}</span>
			<input
				{...inputAttributes}
				className={twMerge(
					`text-md w-full rounded border border-neutral-400 px-2 py-1 outline-none transition focus:bg-neutral-200 disabled:border-neutral-500 disabled:text-neutral-600 ${
						inputAttributes.value && "invalid:border-rose-600"
					}`,
					inputAttributes.className
				)}
			/>
		</label>
	);
};

export default Input;
