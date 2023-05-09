import api from ".";
import { message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "../store";
import {
	setData,
	setFMS,
	setBFMS,
	setServiceStatus,
	setFiles,
} from "../store/fileMonitorThreadSlice";
import {
	FMSWindowsServiceCommand,
	FileMonitorsWindowsServiceStatus,
	FileMonitorConfig,
	FolderType,
	SystemType,
	ThreadFolderFiles,
} from "../types";
import { useEffect, useState } from "react";
import { getIdToken } from "../config";

export const getFileMonitorThreads = (system: SystemType) => {
	return api.get<FileMonitorConfig>("/fileMonitorThreads/all", {
		params: { system },
		headers: {
			Authorization: `Bearer ${getIdToken()}`,
		},
	});
};

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

export const downloadFile = (
	system: SystemType,
	threadName: string,
	folder: FolderType,
	fileName: string
) => {
	return api.get<string>("/fileMonitorThreads/downloadFile", {
		params: {
			system,
			threadName,
			folder,
			fileName,
		},
		headers: {
			Authorization: `Bearer ${getIdToken()}`,
		},
	});
};

export const moveFile = (
	system: SystemType,
	threadName: string,
	from: FolderType,
	to: FolderType,
	fileName: string
) => {
	return api.get<any>("/fileMonitorThreads/moveFile", {
		params: {
			system,
			threadName,
			from,
			to,
			fileName,
		},
		headers: {
			Authorization: `Bearer ${getIdToken()}`,
		},
	});
};

export const getWindowsFMSServiceStatuses = () => {
	return api.get<FileMonitorsWindowsServiceStatus>(
		"/fileMonitorThreads/windowsService/status",
		{
			headers: {
				Authorization: `Bearer ${getIdToken()}`,
			},
		}
	);
};

export const executeWindowsFMSServiceAction = (
	system: SystemType,
	command: FMSWindowsServiceCommand
) => {
	return api.get<any>("/fileMonitorThreads/windowsService/execute", {
		params: {
			system,
			command,
		},
		headers: {
			Authorization: `Bearer ${getIdToken()}`,
		},
	});
};

export const useGetFileMonitorThreads = (system: SystemType) => {
	const dispatch = useDispatch();
	return useQuery(
		["fileMonitorThreads", system],
		() => getFileMonitorThreads(system),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			staleTime: Infinity,
			onSettled(data, error) {
				if (error || !data) {
					message.error("Unable to fetch FMS and BFMS config files");
					console.error(error);
				} else {
					console.log("useGetFileMonitorThreads");
					if (system === SystemType.FMS) dispatch(setFMS(data.data));
					else dispatch(setBFMS(data.data));
					dispatch(setData());
					return data.data;
				}
			},
		}
	);
};

export const useGetFiles = () => {
	const { data, system, folder, page, perPage, sort } = useSelector(
		(state) => state.fileMonitorThreads
	);
	const start = (page - 1) * perPage;
	const end = start + perPage;
	const [threadNames, setThreadNames] = useState<string[]>([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if (data && data.length) {
			const tNames =
				sort === "Thread Name"
					? data.map((m) => m.threadName).slice(start, end)
					: data.map((m) => m.threadName);
			setThreadNames(tNames);
		}
	}, [data]);
	return useQuery(
		["files", folder, { threads: threadNames.sort() }],
		() => getFileMonitorThreadFiles(system, threadNames, folder),
		{
			enabled: threadNames.length > 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			onSettled: (data, error) => {
				if (error || !data) {
					message.error("Unable to fetch files from thread folders");
					console.error(error);
				} else {
					dispatch(setFiles(data.data));
					dispatch(setData());
					return data.data;
				}
			},
		}
	);
};

type DownloadFile = {
	system: SystemType;
	threadName: string;
	folder: FolderType;
	fileName: string;
};
export const useDownLoadFile = () => {
	return useMutation(
		(p: DownloadFile) =>
			downloadFile(p.system, p.threadName, p.folder, p.fileName),
		{
			onSettled: (data, error) => {
				if (error) {
					message.error("Error while downloading file");
					console.error(error);
				} else message.success("File downloaded");
			},
		}
	);
};

type MoveFile = {
	system: SystemType;
	threadName: string;
	from: FolderType;
	to: FolderType;
	fileName: string;
};

export const useMoveFile = () => {
	const files = useGetFiles();
	return useMutation(
		(m: MoveFile) => moveFile(m.system, m.threadName, m.from, m.to, m.fileName),
		{
			onSettled: (data, error) => {
				if (error) {
					message.error("Error while moving files.");
					console.error(error);
				} else files.refetch();
			},
		}
	);
};

export const useGetFileMonitorWindowsServiceStatus = () => {
	const dispatch = useDispatch();
	return useQuery(
		["windowsServiceStatus"],
		() => getWindowsFMSServiceStatuses(),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			onSettled: (data, error) => {
				if (error || !data) {
					message.error("Error while fetching Windows service status");
					console.error(error);
				} else dispatch(setServiceStatus(data.data));
			},
		}
	);
};
