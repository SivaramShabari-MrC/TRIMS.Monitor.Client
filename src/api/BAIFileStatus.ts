import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import api from ".";
import { useSelector } from "../store";

const baiStatement = (date: string) =>
	api.get(`/BAIFileStatus`, {
		params: {
			date,
		},
	});

export const useBAIFileReport = () => {
	const date = useSelector((state) => state.BAIFileStatus.date);
	return useQuery(["bai-statement", date], () => baiStatement(date), {
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnMount: false,
		enabled: !!date,
		onSuccess: (data) => {},
		onError: (e: any) => {
			message.error(e.message);
		},
	});
};
