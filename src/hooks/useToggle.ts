import { useState } from "react";

export function useToggle(
	initialValue: boolean
): readonly [
	value: boolean,
	toggle: () => void,
	setValue: React.Dispatch<React.SetStateAction<boolean>>,
] {
	const [value, setValue] = useState<boolean>(initialValue);

	function toggle(): void {
		setValue((prev) => !prev);
	}

	return [value, toggle, setValue] as const;
}