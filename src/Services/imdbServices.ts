import { InfoFull, InfoSearch } from "../Constants/ResponseTypes";
import { SearchOption } from "../Constants/SearchOption";
import { searchOptionsUtil } from "../util/searchOption";
import { makeRequest } from "./makeRequest";

export const handleGetTableData = (
	searchParam: string,
	page: number,
	searchOptions: SearchOption[]
) => {
	return makeRequest<InfoSearch>({
		url: "http://www.omdbapi.com",
		method: "GET",
		params: {
			apikey: process.env.REACT_APP_API_KEY,
			s: searchParam === "" ? undefined : searchParam,
			page: page.toString(),
			...searchOptionsUtil(searchOptions),
		},
	});
};

export const handleGetDetailData = (imdbId: string) => {
	return makeRequest<InfoFull>({
		url: "http://www.omdbapi.com",
		method: "GET",
		params: {
			plot: "full",
			apikey: process.env.REACT_APP_API_KEY,
			i: imdbId,
		},
	});
};
