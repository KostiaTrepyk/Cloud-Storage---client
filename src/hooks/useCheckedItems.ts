import { useCallback, useEffect, useState } from "react"

export function useCheckedItems<Item extends { id: number | string }>(
	items: Item[]
) {
	const [checkedItems, setCheckedItems] = useState<Item[]>([]);

	useEffect(() => {
		setCheckedItems((prev) =>
			items.filter((item) =>
				prev.some((prevItem) => prevItem.id === item.id)
			)
		);
	}, [items]);

	const addItemToChecked = useCallback((item: Item) => {
		setCheckedItems((prev) => [...prev, item]);
	}, []);

	const removeItemFromChecked = useCallback((item: Item) => {
		setCheckedItems((prev) =>
			prev.filter((prevItem) => prevItem.id !== item.id)
		);
	}, []);

	const clearCheckedItems = useCallback(() => {
		setCheckedItems([]);
	}, []);

	return {
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
	} as const;
}