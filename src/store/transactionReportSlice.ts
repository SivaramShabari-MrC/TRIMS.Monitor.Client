import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface TransactionReportState {
	from: string;
	to: string;
}
const initialState: TransactionReportState = {
	from: moment().subtract(1, "days").format("l"),
	to: moment().format("l"),
};
export const transactionReport = createSlice({
	name: "transactionReport",
	initialState,
	reducers: {
		setFrom: (state, action) => ({ ...state, from: action.payload }),
		setTo: (state, action) => ({ ...state, to: action.payload }),
	},
});

export default transactionReport.reducer;

export const { setFrom, setTo } = transactionReport.actions;
