import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import api from ".";
import { EnvironmentType } from "../types";
import { useSelector } from "../store";
import { ScheduledTask } from "../types/ScheduledTask";

const getWindowsScheduledTasks = (environment: EnvironmentType) =>
	api.get<ScheduledTask[]>("/scheduledTasks", { params: { environment } });

export const useGetScheduledTasks = () => {
	const environment = useSelector((state) => state.global.environment);
	return useQuery(
		["windows-scheduled-tasks", environment],
		() => getWindowsScheduledTasks(environment),
		{
			onSuccess: (data) => {
				return data.data;
			},
			onError: (e: any) => {
				message.error(e.message);
			},
		}
	);
};
