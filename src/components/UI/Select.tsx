import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";


interface Option<Values extends string> {
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

const Select = <Values extends string>({
	options,
	onChange: customOnChange,
	...selectAttributes
}: Props<Values>) => {
	return (
		<select
			{...selectAttributes}
			className={twMerge(
				"rounded border p-2 outline-none transition focus:border-neutral-600",
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
};

export default Select;
