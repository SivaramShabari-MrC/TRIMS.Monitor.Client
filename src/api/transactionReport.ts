import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import api from ".";
import { TransactionReport } from "../types/TransactionReport";
import { useDispatch, useSelector } from "../store";
import moment from "moment";

const getTransactionReport = (from: string, to: string) =>
	api.get<TransactionReport[]>("/transactionReport", {
		params: {
			from,
			to,
		},
	});

export const useTransactionReport = () => {
	const dispatch = useDispatch();
	const { from, to } = useSelector((state) => state.transactionReport);
	return useQuery(
		["transactionReport", moment(from).format("l"), moment(to).format("l")],
		() => getTransactionReport(from, to),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			enabled: !!from && !!to,
			onSuccess: (data) => {
				return data;
			},
			onError: (e: any) => {
				message.error(e.message);
			},
		}
	);
};
