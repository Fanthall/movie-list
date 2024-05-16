import { SearchOption } from "../Constants/SearchOption";

export const searchOptionsUtil = (searchOptions: SearchOption[]) => {
	let params = {};
	searchOptions.forEach((item) => {
		params = { ...params, [item.key]: item.value.toString() };
	});
	return params;
};
