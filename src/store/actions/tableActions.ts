import { InfoShort } from "../../Constants/ResponseTypes";
import { SearchOption } from "../../Constants/SearchOption";
import { handleGetTableData } from "../../Services/imdbServices";
import { SearchState } from "../reducer/tableReducer";
import { FanthalDispatch } from "../store";
import { TableActionTypes } from "../types/tableActionTypes";

interface StateChangeEvent {
	type: TableActionTypes.TABLE_STATE_CHANGED_TYPE;
	newState: SearchState;
}

interface GetTableData {
	type: TableActionTypes.GET_TABLE_DATA;
	pageData: InfoShort[];
	totalCount: number;
}
interface GetTableDataStart {
	type: TableActionTypes.GET_TABLE_DATA_START;
}
interface GetTableDataFail {
	type: TableActionTypes.TABLE_DATA_ACTION_FAIL;
}
interface AnyAction {
	type: "ANY_ACTION";
}

export type TableActions =
	| AnyAction
	| StateChangeEvent
	| GetTableData
	| GetTableDataStart
	| GetTableDataFail;

const updateTableStateAction = (newState: SearchState): TableActions => {
	return {
		type: TableActionTypes.TABLE_STATE_CHANGED_TYPE,
		newState: newState,
	};
};

export const updateTableState = (newState: SearchState) => {
	return (dispatch: FanthalDispatch) => {
		dispatch(updateTableStateAction(newState));
	};
};
const getTableDataSuccess = (
	pageData: InfoShort[],
	totalCount: number
): TableActions => {
	return {
		type: TableActionTypes.GET_TABLE_DATA,
		pageData,
		totalCount,
	};
};
const getTableDataStart = (): TableActions => {
	return {
		type: TableActionTypes.GET_TABLE_DATA_START,
	};
};
const actionFail = (): TableActions => {
	return {
		type: TableActionTypes.TABLE_DATA_ACTION_FAIL,
	};
};
export const getTableData = (
	searchParam: string,
	page: number,
	searchOptions: SearchOption[] = []
) => {
	return (dispatch: FanthalDispatch) => {
		dispatch(getTableDataStart());
		handleGetTableData(searchParam, page, searchOptions)
			.then((response) => {
				console.log(typeof response.data.Response);
				if (response.data.Response === "True") {
					dispatch(
						getTableDataSuccess(
							response.data.Search,
							parseInt(response.data.totalResults)
						)
					);
				} else {
					dispatch(actionFail());
				}
			})
			.catch((error) => {
				dispatch(actionFail());
			});
	};
};

const TableDataActionsFunc = { updateTableState, getTableData };

export default TableDataActionsFunc;
