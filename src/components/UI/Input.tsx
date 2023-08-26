import { forwardRef } from "react";
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	labelClassName?: string;
	inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ label, labelClassName, ...inputAttributes }, ref) => {
		return (
			<label className={twMerge("grid w-full gap-1", labelClassName)}>
				{label && <span>{label}</span>}
				<input
					{...inputAttributes}
					className={twMerge(
						`w-full rounded border border-neutral-300 px-2 py-1 outline-none transition focus:border-neutral-500 focus:bg-neutral-200 disabled:border-neutral-500 disabled:text-neutral-600 ${
							inputAttributes.value && "invalid:border-rose-600"
						}`,
						inputAttributes.className
					)}
					ref={ref}
				/>
			</label>
		);
	}
);

export default Input;
