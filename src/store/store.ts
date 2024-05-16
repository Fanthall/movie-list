import { configureStore } from "@reduxjs/toolkit";
import TableReducer from "./reducer/tableReducer";

const rootReducer = {
	tableData: TableReducer,
};
const Store = configureStore({
	reducer: rootReducer,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({ serializableCheck: false });
	},
});
export default Store;
export type RootState = ReturnType<typeof Store.getState>;

export type FanthalDispatch = typeof Store.dispatch;
