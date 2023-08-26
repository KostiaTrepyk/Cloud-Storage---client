/* import { useCallback, useEffect, useState } from "react"
import { LocalStorage, localStorageKeys } from "../types/localStorage";

export function useLocalStorage<Key extends localStorageKeys>(
	key: Key,
	initialValue: LocalStorage[Key]
): readonly [
	storedValue: unknown,
	setStoredValue: React.Dispatch<React.SetStateAction<LocalStorage[Key]>>,
] {
	// !!!!!!!!!!!!!
	const readValue = useCallback((): LocalStorage[Key] => {
		try {
			const storageValue = localStorage.getItem(key);
			if (storageValue)
				return JSON.parse(storageValue) as LocalStorage[Key];
		} catch (error) {
			console.error(error);
		}
		return initialValue;
	}, [key, initialValue]);

	const [storedValue, setStoredValue] =
		useState<LocalStorage[Key]>(readValue);

	const onLocalStorageChange = useCallback(
		(e: StorageEvent) => {
			if (key === e.key)
				localStorage.setItem(key, JSON.stringify(storedValue));
		},
		[key, storedValue]
	);

	useEffect(() => {
		setStoredValue(readValue());
		window.addEventListener("storage", onLocalStorageChange);
		return () => {
			window.removeEventListener("storage", onLocalStorageChange);
		};
	}, []);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue));
	}, [storedValue, key]);

	return [storedValue, setStoredValue] as const;
}
 */

export default function (){

}