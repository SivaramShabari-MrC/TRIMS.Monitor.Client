import { configureStore, createSlice } from "@reduxjs/toolkit";
import fileMonitorThreads from "./fileMonitorThreadSlice";
import transactionReport from "./transactionReportSlice";
import BAIFileStatus from "./BAIFileStatusSlice";
import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from "react-redux";

interface GlobalState {
	user: string | null;
}

const initialState: GlobalState = {
	user: null,
};
const global = createSlice({
	name: "global",
	initialState,
	reducers: {
		setUser: (state, action) => ({ ...state, user: action.payload }),
	},
});

export const { setUser } = global.actions;

const store = configureStore({
	reducer: {
		global: global.reducer,
		fileMonitorThreads,
		transactionReport,
		BAIFileStatus,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useDispatch: DispatchFunc = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
