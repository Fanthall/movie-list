import { InfoShort } from "../../Constants/ResponseTypes";
import { SearchOption } from "../../Constants/SearchOption";
import { TableActions } from "../actions/tableActions";
import { TableActionTypes } from "../types/tableActionTypes";

export interface SearchState {
	searchParam: string;
	page: number;
	pageSize: number;
	searchOptions: SearchOption[];
}
export interface PageData {
	data: InfoShort[];
	totalPages: number;
}
export interface TableState {
	searchState: SearchState;
	pageData: PageData;
	loading: boolean;
	errorMessage?: string;
}
const initialState: TableState = {
	searchState: {
		searchParam: "pokemon",
		page: 1,
		pageSize: 10,
		searchOptions: [],
	},
	pageData: {
		totalPages: 1,
		data: [],
	},
	loading: false,
	errorMessage: undefined,
};

const TableReducer = (
	state = initialState,
	action: TableActions
): TableState => {
	if (action.type === TableActionTypes.TABLE_STATE_CHANGED_TYPE) {
		return {
			...state,
			searchState: action.newState,
			pageData: { data: [], totalPages: 1 },
		};
	} else if (action.type === TableActionTypes.GET_TABLE_DATA) {
		return {
			...state,
			pageData: {
				data: action.pageData,
				totalPages: Math.ceil(
					action.totalCount / state.searchState.pageSize
				),
			},
			loading: false,
			errorMessage: undefined,
		};
	} else if (action.type === TableActionTypes.GET_TABLE_DATA_START) {
		return { ...state, loading: true };
	} else if (action.type === TableActionTypes.TABLE_DATA_ACTION_FAIL) {
		return {
			...state,
			pageData: { data: [], totalPages: 1 },
			loading: false,
			errorMessage: "Cannot get the table data.",
		};
	} else {
		return { ...state };
	}
};

export default TableReducer;
