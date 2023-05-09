import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface BAIFileStatusState {
	date: string;
	status: any;
}

const initialState: BAIFileStatusState = {
	date: dayjs().subtract(1, "day").format("MM/DD/YYYY"),
	status: {},
};
export const BAIFileStatus = createSlice({
	name: "BAIFileStatus",
	initialState,
	reducers: {
		setDate: (state, action) => ({
			...state,
			date: action.payload,
		}),
		setBaiStatus: (state, action) => ({
			...state,
			status: action.payload,
		}),
	},
});

export default BAIFileStatus.reducer;

export const { setDate, setBaiStatus } = BAIFileStatus.actions;
