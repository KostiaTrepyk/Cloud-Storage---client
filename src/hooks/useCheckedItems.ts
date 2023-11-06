import { useEffect, useState } from "react"

export function useCheckedItems<Item extends { id: number | string }>(
	items: Item[]
) {
	const [checkedItems, setCheckedItems] = useState<Item[]>([]);

	useEffect(() => {
		setCheckedItems((prev) =>
			prev.filter((prevItem) => items.includes(prevItem))
		);
	}, [items]);

	function addToChecked(item: Item) {
		if (!items.includes(item)) return;

		setCheckedItems((prev) => [...prev, item]);
	}

	function removeFromChecked(item: Item) {
		setCheckedItems((prev) =>
			prev.filter((prevItem) => prevItem.id !== item.id)
		);
	}

	function clearChecked() {
		setCheckedItems([]);
	}

	return {
		checkedItems,
		removeFromChecked,
		clearChecked,
		addToChecked,
	} as const;
}