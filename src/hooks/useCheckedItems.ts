import { useEffect, useState } from "react"

export function useCheckedItems<Item extends { id: number | string }>(
	items: Item[]
) {
	const [checkedItems, setCheckedItems] = useState<Item[]>([]);

	useEffect(() => {
		if (checkedItems.length)
			setCheckedItems((prev) =>
				prev.filter((prevItem) => items.includes(prevItem))
			);
	}, [items]);

	function addItemToChecked(item: Item) {
		if (!items.includes(item)) return;

		setCheckedItems((prev) => [...prev, item]);
	}

	function removeItemFromChecked(item: Item) {
		setCheckedItems((prev) => prev.filter((prevItem) => prevItem !== item));
	}

	function clearCheckedItems() {
		if (checkedItems.length) setCheckedItems([]);
	}

	return {
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
	} as const;
}