import { forwardRef, useId } from "react";
import { twMerge } from 'tailwind-merge'

interface InputProps {
	/** @default false */
	fullWidth?: boolean;

	wrapper?: {
		className?: string;
	};
	label?: {
		text: string;
		className?: string;
	};
	input?: {
		className?: string;
	} & React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ fullWidth = false, wrapper, label, input }, ref) => {
		const inputId = useId();

		return (
			<div
				{...wrapper}
				className={twMerge(
					"flex w-fit flex-col gap-1",
					fullWidth && "w-full",
					wrapper?.className
				)}
			>
				{label?.text && (
					<label
						htmlFor={inputId}
						className={twMerge(
							"w-full px-0.5 text-neutral-900 transition-colors duration-500",
							input?.disabled && "text-neutral-400",
							label.className
						)}
					>
						{input?.required && (
							<span className="text-red-600">*&nbsp;</span>
						)}
						{label.text}
					</label>
				)}
				<input
					{...input}
					id={inputId}
					className={twMerge(
						"w-full rounded border border-neutral-300 px-2 py-1 outline-none transition duration-500 hover:bg-neutral-100 focus:border-neutral-500 focus:bg-neutral-200",
						input?.value && "invalid:border-red-600",
						input?.disabled && "cursor-not-allowed contrast-75",
						input?.className
					)}
					ref={ref}
				/>
			</div>
		);
	}
);

export default Input;
