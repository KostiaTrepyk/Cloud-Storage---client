import { useState } from "react";

export function useToggle(
	initialValue: boolean
): readonly [
	value: boolean,
	setValue: React.Dispatch<React.SetStateAction<boolean>>,
	toggle: () => void,
] {
	const [value, setValue] = useState<boolean>(initialValue);

	function toggle(): void {
		setValue((prev) => !prev);
	}

	return [value, setValue, toggle] as const;
}