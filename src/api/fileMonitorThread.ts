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
	EnvironmentType,
	FMSWindowsServiceCommand,
	FileMonitorsWindowsServiceStatus,
	FileMonitorConfig,
	FolderType,
	SystemType,
	ThreadFolderFiles,
} from "../types";

export const getFileMonitorThreads = (
	environment: EnvironmentType,
	system: SystemType,
	includeFiles: boolean,
	folder: FolderType
) => {
	return api.get<FileMonitorConfig>("/fileMonitorThreads/all", {
		params: {
			environment,
			system,
			includeFiles,
			folder,
		},
	});
};

export const getFileMonitorThreadFiles = (
	environment: EnvironmentType,
	system: SystemType,
	threadNames: string[],
	folder: FolderType
) => {
	return api.get<ThreadFolderFiles[]>("/fileMonitorThreads/files", {
		params: {
			environment,
			system,
			threadNames: threadNames.join(","),
			folder,
		},
	});
};

export const downloadFile = (
	environment: EnvironmentType,
	system: SystemType,
	threadName: string,
	folder: FolderType,
	fileName: string
) => {
	return api.get<string>("/fileMonitorThreads/downloadFile", {
		params: {
			environment,
			system,
			threadName,
			folder,
			fileName,
		},
	});
};

export const moveFile = (
	environment: EnvironmentType,
	system: SystemType,
	threadName: string,
	from: FolderType,
	to: FolderType,
	fileName: string
) => {
	return api.get<any>("/fileMonitorThreads/moveFile", {
		params: {
			environment,
			system,
			threadName,
			from,
			to,
			fileName,
		},
	});
};

export const getWindowsFMSServiceStatuses = (environment: EnvironmentType) => {
	return api.get<FileMonitorsWindowsServiceStatus>(
		"/fileMonitorThreads/windowsService/status",
		{
			params: {
				environment,
			},
		}
	);
};

export const executeWindowsFMSServiceAction = (
	environment: EnvironmentType,
	system: SystemType,
	command: FMSWindowsServiceCommand
) => {
	return api.get<any>("/fileMonitorThreads/windowsService/execute", {
		params: {
			environment,
			system,
			command,
		},
	});
};

export const useGetFileMonitorThreads = () => {
	const state = useSelector((s) => s.fileMonitorThreads);
	const environment = useSelector((s) => s.global.environment);
	const dispatch = useDispatch();
	const includeAllFiles = state.includeFileCount;
	const folder = state.folder;
	return useQuery(
		[
			"fileMonitorThreads",
			state.includeFileCount,
			state.folder,
			state.system,
			environment,
		],
		() =>
			getFileMonitorThreads(environment, state.system, includeAllFiles, folder),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			onSuccess: (data) => {
				dispatch(setDataLoading(false));
				dispatch(
					setFileMonitorThreads(
						data.data.sort((a, b) => (a.threadName > b.threadName ? 1 : -1))
					)
				);
				dispatch(setData());
				if (state.includeFileCount) {
					const fileMonitorThreads = data.data
						.filter((thread) => thread.files !== null)
						.sort((a, b) => b.files!.length - a.files!.length);
					return fileMonitorThreads;
				} else return data.data;
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
	const state = useSelector((state) => state.fileMonitorThreads);
	const environment = useSelector((state) => state.global.environment);
	const threadNames = state.data.map((m) => m.threadName);
	const dispatch = useDispatch();
	return useQuery(
		["paths", ...threadNames, environment],
		() =>
			getFileMonitorThreadFiles(
				environment,
				state.system,
				threadNames,
				state.folder
			),
		{
			enabled: !state.includeFileCount && threadNames.length > 0,
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
	environment: EnvironmentType;
	system: SystemType;
	threadName: string;
	folder: FolderType;
	fileName: string;
};
export const useDownLoadFile = () => {
	return useMutation(
		(p: DownloadFile) =>
			downloadFile(p.environment, p.system, p.threadName, p.folder, p.fileName),
		{
			onSuccess: () => {},
		}
	);
};

type MoveFile = {
	environment: EnvironmentType;
	system: SystemType;
	threadName: string;
	from: FolderType;
	to: FolderType;
	fileName: string;
};

export const useMoveFile = () => {
	const client = useQueryClient();
	return useMutation(
		(m: MoveFile) =>
			moveFile(m.environment, m.system, m.threadName, m.from, m.to, m.fileName),
		{
			onSuccess: () => {
				client.invalidateQueries({ queryKey: ["fileMonitorThreads", "paths"] });
			},
		}
	);
};

export const useGetFileMonitorWindowsServiceStatus = () => {
	const environment = useSelector((state) => state.global.environment);
	const dispatch = useDispatch();
	return useQuery(
		["windowsServiceStatus", environment],
		() => getWindowsFMSServiceStatuses(environment),
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
