import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { EnvironmentType } from "../types";
import api from ".";
import { useSelector } from "../store";

const baiStatement = (environment: EnvironmentType, date: string) =>
	api.get(`/BAIFileStatus`, {
		params: {
			environment,
			date,
		},
	});

export const useBAIFileReport = () => {
	const environment = useSelector((state) => state.global.environment);
	const date = useSelector((state) => state.BAIFileStatus.date);
	return useQuery(
		["bai-statement", date, environment],
		() => baiStatement(environment, date),
		{
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retryOnMount: false,
			refetchOnMount: false,
			enabled: !!date,
			onSuccess: (data) => {},
			onError: (e: any) => {
				message.error(e.message);
			},
		}
	);
};
