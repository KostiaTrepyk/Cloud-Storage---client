/**
 * @returns Returns the cookie in the object.
 */
export function getAllCookies(): Record<string, string> {
	const coockie = document.cookie;
	const result: Record<string, string> = {};

	coockie.split(";").forEach((item) => {
		const [name, value] = item.split("=");
		if (!name) return;
		result[name] = value;
	});

	return result;
}

/**
 * @returns Returns the value of a cookie by name.
 */
export function getCookieValue(name: string): string | undefined {
	const coockies = document.cookie.split(";");

	for (let i = 0; i < coockies.length; i++) {
		const [_name, _value] = coockies[i].split("=");

		if (name === _name) {
			return _value;
		}
	}

	return undefined;
}

/**
 * @description Sets the value of a cookie by name.
 */
export function setCookie(
	name: string,
	value: string,
	params?: CookieParams
): void {
	let newCookie: string = `${name}=${value}; `;

	if (params?.secure) newCookie += "Secure; ";
	if (params?.expires) newCookie += `expires=${params.expires}; `;
	if (params?.["max-age"]) newCookie += `max-age=${params["max-age"]}; `;
	if (params?.path) newCookie += `path=${params.path}; `;

	document.cookie = newCookie;
}

/**
 * @description Deletes cookie by name. It will not delete cookie with HttpOnly flag set.
 */
export function deleteCookieByName(
	name: string,
	params?: { path?: string }
): void {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const [_name] = cookies[i].split("=");
		if (name === _name) {
			let cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";

			if (params?.path) cookie += " path=" + params.path + ";";

			document.cookie = cookie;
		}
	}
}

/**
 * @description Deletes all cookies. It will not delete cookies with HttpOnly flag set.
 */
export function deleteAllCookies(): void {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

export interface CookieParams {
	expires?: Date;
	"max-age"?: number;
	secure?: boolean;
	path?: string;
}