import { forwardRef, useId } from "react";
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	labelClassName?: string;
	inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ label, labelClassName, ...inputAttributes }, ref) => {
		const inputId = useId();

		return (
			<>
				{label && (
					<label
						htmlFor={inputId}
						className={labelClassName}
					>
						<span>{label}</span>
					</label>
				)}
				<input
					{...inputAttributes}
					id={inputId}
					className={twMerge(
						"rounded border border-neutral-300 px-2 py-1 outline-none transition duration-300 hover:bg-neutral-100 focus:border-neutral-500 focus:bg-neutral-200",
						inputAttributes.value && "invalid:border-red-600",
						inputAttributes.disabled && "contrast-75",
						inputAttributes.className
					)}
					ref={ref}
				/>
			</>
		);
	}
);

export default Input;
