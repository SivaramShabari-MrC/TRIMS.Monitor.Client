import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import api from ".";
import { useSelector } from "../store";
import { ScheduledTask } from "../types/ScheduledTask";

const getWindowsScheduledTasks = () =>
	api.get<ScheduledTask[]>("/scheduledTasks");

export const useGetScheduledTasks = () => {
	return useQuery(
		["windows-scheduled-tasks"],
		() => getWindowsScheduledTasks(),
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
