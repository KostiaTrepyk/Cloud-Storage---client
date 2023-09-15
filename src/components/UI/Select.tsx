import { SelectHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";


export interface Option<Values extends string> {
	id: string | number;
	label: string;
	value: Values;
}

interface Props<Values extends string>
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
	options: Option<Values>[];
	onChange?: (
		value: Option<Values> | undefined,
		e: React.ChangeEvent<HTMLSelectElement>
	) => void;
}

/* Какая-то хуйня здесь происходит !!! */
const Select = (<Values extends string>() =>
	forwardRef<HTMLSelectElement, Props<Values>>(
		({ options, onChange: customOnChange, ...selectAttributes }, ref) => {
			return (
				<select
					{...selectAttributes}
					className={twMerge(
						"cursor-pointer rounded border border-neutral-300 px-2 py-1 outline-none transition duration-300 hover:bg-neutral-100 focus:border-neutral-500",
						selectAttributes.className
					)}
					onChange={(event) =>
						customOnChange &&
						customOnChange(
							options.find(
								(option) => option.value === event.target.value
							),
							event
						)
					}
					ref={ref}
				>
					{options.map((option) => (
						<option
							key={option.id}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>
			);
		}
	))();

export default Select;
