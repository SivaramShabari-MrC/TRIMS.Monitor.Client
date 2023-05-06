import api from ".";
import { message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "../store";
import {
	setData,
	setDataLoading,
	setFileMonitorThreads,
	setFileMonitorWindowsServiceStatus,
	setFiles,
	setFilesLoading,
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

export const getFileMonitorThreads = (
	system: SystemType,
	folder: FolderType
) => {
	return api.get<FileMonitorConfig>("/fileMonitorThreads/all", {
		params: {
			system,
			folder,
		},
	});
};

export const getFileMonitorThreadFiles = (
	system: SystemType,
	threadNames: string[],
	folder: FolderType,
	setFilesLoading: () => void
) => {
	setFilesLoading();
	return api.get<ThreadFolderFiles[]>("/fileMonitorThreads/files", {
		params: {
			system,
			threadNames: threadNames.join(","),
			folder,
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
	});
};

export const getWindowsFMSServiceStatuses = () => {
	return api.get<FileMonitorsWindowsServiceStatus>(
		"/fileMonitorThreads/windowsService/status"
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
	});
};

export const useGetFileMonitorThreads = () => {
	const state = useSelector((s) => s.fileMonitorThreads);
	const dispatch = useDispatch();
	const folder = state.folder;
	return useQuery(
		["fileMonitorThreads", state.system],
		() => getFileMonitorThreads(state.system, folder),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			onSuccess: (data) => {
				dispatch(setDataLoading(false));
				dispatch(
					setFileMonitorThreads(
						data.data
							.slice()
							.sort((a, b) => (a.threadName > b.threadName ? 1 : -1))
					)
				);
				dispatch(setData());
				return data.data;
			},
			onError: (e: any) => {
				message.error(e.message);
			},
			onSettled: () => {
				dispatch(setDataLoading(false));
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
	const _setFilesLoading = () => {
		dispatch(setFilesLoading(true));
	};
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
		["files", folder, ...threadNames],
		() =>
			getFileMonitorThreadFiles(system, threadNames, folder, _setFilesLoading),
		{
			enabled: threadNames.length > 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			onSuccess: (data) => {
				dispatch(setFiles(data.data));
				dispatch(setData());
				return data.data;
			},
			onError: (e: any) => {
				message.error(e.message);
			},
			onSettled: () => {
				dispatch(setFilesLoading(false));
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
			onSuccess: () => {},
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
			onSuccess: () => {
				files.refetch();
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
			onSuccess: (data) => {
				dispatch(setFileMonitorWindowsServiceStatus(data.data));
			},
		}
	);
};
