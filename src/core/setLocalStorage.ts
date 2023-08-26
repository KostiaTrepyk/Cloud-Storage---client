import { getDevice } from "../helpers/getDevice";
import { localStorageKeys } from "../types/localStorage";

export default function setLocalStorage() {
	localStorage.setItem(localStorageKeys.DEVICE, getDevice());
}
