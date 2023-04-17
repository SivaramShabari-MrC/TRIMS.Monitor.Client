import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import api from ".";
import { EnvironmentType } from "../types";
import { TransactionReport } from "../types/TransactionReport";
import { useDispatch, useSelector } from "../store";
import moment from "moment";

const getTransactionReport = (
	environment: EnvironmentType,
	from: string,
	to: string
) =>
	api.get<TransactionReport[]>("/transactionReport", {
		params: {
			environment,
			from,
			to,
		},
	});

export const useTransactionReport = () => {
	const dispatch = useDispatch();
	const environment = useSelector((state) => state.global.environment);
	const { from, to } = useSelector((state) => state.transactionReport);
	return useQuery(
		[
			"transactionReport",
			moment(from).format("l"),
			moment(to).format("l"),
			environment,
		],
		() => getTransactionReport(environment, from, to),
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
