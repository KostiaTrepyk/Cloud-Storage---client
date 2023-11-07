export function getLocalStorageValue(key: string, defaultValue?: any): unknown {
	let value;

	try {
		const localStorageValue = localStorage.getItem(key);

		if (localStorageValue) {
			value = JSON.parse(localStorageValue);
		}
	} catch (error) {
		if (defaultValue) {
			value = defaultValue;
			localStorage.setItem(key, JSON.stringify(defaultValue));
		} else {
			localStorage.removeItem(key);
		}
		console.error(error);
	}

	return value;
}
