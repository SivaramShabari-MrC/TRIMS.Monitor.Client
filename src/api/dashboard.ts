import { useState, useEffect } from "react";
import api from ".";
import { useSelector } from "../store";
import {
	FolderType,
	GetFolderTypeKey,
	SystemType,
	ThreadFolderFiles,
} from "../types";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useGetFileMonitorThreads } from "./fileMonitorThread";
import { getIdToken } from "../config";

export const getFileMonitorThreadFiles = (
	system: SystemType,
	threadNames: string[],
	folder: FolderType
) => {
	return api.get<ThreadFolderFiles[]>("/fileMonitorThreads/files", {
		params: {
			system,
			threadNames: threadNames.join(","),
			folder,
		},
		headers: {
			Authorization: `Bearer ${getIdToken()}`,
		},
	});
};

export const useGetFiles = ({
	folder,
	system,
}: {
	folder: FolderType;
	system: SystemType;
}) => {
	const [threadNames, setThreadNames] = useState<string[]>([]);
	const threads = useGetFileMonitorThreads(system);
	useEffect(() => {
		let data = threads.data?.data
			?.filter(
				(monitor) =>
					!!monitor.endpoint?.addEndPoint[0][GetFolderTypeKey(folder)] ||
					!!monitor.endpoint?.addEndPoint[1][GetFolderTypeKey(folder)]
			)
			.map((t) => t.threadName);
		setThreadNames(data || []);
	}, [threads.data]);
	return useQuery(
		["files", folder, ...threadNames],
		() => getFileMonitorThreadFiles(system, threadNames, folder),
		{
			enabled: threadNames.length > 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,

			onError: (e: any) => {},
			onSettled: (data, error) => {
				if (error || !data) {
					message.error("Unable to fetch files from thread folders");
					console.error(error);
				}
			},
		}
	);
};
