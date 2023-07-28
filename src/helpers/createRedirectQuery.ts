import { SearchParamsEnum } from "../types/searchParamsEnum";
import { searchParamsFromObj } from "./searchParamsFromObj";
import { searchParamsToObj } from "./searchParamsToObj";

export const createRedirectQuery = (
	pathname: string,
	search?: string,
	immediately?: boolean
): string => {
	let query: string | undefined = undefined;
	if (search) {
		query = JSON.stringify(searchParamsToObj(search));
	}

	return searchParamsFromObj({
		[SearchParamsEnum.REDIRECT]: pathname,
		[SearchParamsEnum.QUERY]: query,
		[SearchParamsEnum.IMMEDIATELY]: immediately ? "yes" : undefined,
	});
};
