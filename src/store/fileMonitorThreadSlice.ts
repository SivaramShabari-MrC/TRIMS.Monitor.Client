import { createSlice, current } from "@reduxjs/toolkit";
import { FileMonitorConfig } from "../types/FileMonitorConfig";
import {
	FolderType,
	SystemType,
	ThreadFolderFiles,
	FileMonitorsWindowsServiceStatus,
	GetFolderTypeKey,
} from "../types";

interface FileMonitorThreadsState {
	fileMonitorThreads: FileMonitorConfig;
	data: FileMonitorConfig;
	columns: string[];
	autoStart: string;
	folder: FolderType;
	searchQuery: string;
	page: number;
	perPage: number;
	isDataLoading: boolean;
	isFilesLoading: boolean;
	files: ThreadFolderFiles[];
	sort: "File Count" | "File Time" | "Thread Name";
	system: SystemType;
	fileMonitorWindowsServiceStatus: FileMonitorsWindowsServiceStatus;
}

const initialState: FileMonitorThreadsState = {
	fileMonitorThreads: [],
	data: [],
	columns: ["MonitorName", "AutoStart", "FileCount", "Path"],
	autoStart: "All",
	folder: FolderType.sourceFolder,
	searchQuery: "",
	page: 1,
	perPage: 12,
	isDataLoading: true,
	isFilesLoading: true,
	files: [],
	sort: "Thread Name",
	system: SystemType.FMS,
	fileMonitorWindowsServiceStatus: {
		fms: "Loading...",
		bfms: "Loading...",
	},
};

export const fileMonitorThreadsSlice = createSlice({
	name: "fileMonitorThreads",
	initialState,
	reducers: {
		setState: (state, action) => action.payload || state,
		setFolder: (state, action: { type: any; payload: FolderType }) => ({
			...state,
			folder: action.payload,
		}),
		setSearch: (state, action) => ({ ...state, searchQuery: action.payload }),
		setSystem: (state, action: { type: any; payload: SystemType }) => ({
			...state,
			system: action.payload,
		}),
		setColumns: (state, action) => ({ ...state, columns: action.payload }),
		setFileMonitorThreads: (state, action) => ({
			...state,
			fileMonitorThreads: action.payload,
		}),
		setAutoStart: (state, action) => ({ ...state, autoStart: action.payload }),
		setSort: (state, action) => ({
			...state,
			sort: action.payload,
		}),
		setDataLoading: (state, action) => ({
			...state,
			isDataLoading: action.payload,
		}),
		setFilesLoading: (state, action) => ({
			...state,
			isFilesLoading: action.payload === "NULL" ? null : action.payload,
		}),
		setPage: (state, action) => ({
			...state,
			page: action.payload,
		}),
		setPageSize: (state, action) => ({
			...state,
			perPage: action.payload,
		}),
		setFiles: (state, action: { type: any; payload: ThreadFolderFiles[] }) => {
			const files = state.files.slice();
			for (const file of action.payload) {
				const existingIndex = files.findIndex(
					(f) => f.threadName === file.threadName && f.folder === file.folder
				);
				if (existingIndex >= 0) files[existingIndex] = file;
				else files.push(file);
			}
			return { ...state, files };
		},
		setData: (state) => {
			let fileMonitorThreads = current(state.fileMonitorThreads);
			let data = fileMonitorThreads.filter(
				(monitor) =>
					!!monitor.endpoint?.addEndPoint[0][GetFolderTypeKey(state.folder)] ||
					!!monitor.endpoint?.addEndPoint[1][GetFolderTypeKey(state.folder)] ||
					state.folder === FolderType.debugFolder
			);
			if (state.searchQuery !== "") {
				data = data.filter((m) =>
					m.threadName.toLowerCase().includes(state.searchQuery.toLowerCase())
				);
			}
			if (state.sort === "Thread Name") {
				data = data.sort((t1, t2) =>
					t2.threadName.localeCompare(t2.threadName)
				);
			} else if (state.sort === "File Count") {
				data = data.sort((t1, t2) => {
					const l1 =
						state.files.find(
							(file) =>
								file.threadName === t1.threadName &&
								file.folder === state.folder
						)?.files.length || 0;
					const l2 =
						state.files.find(
							(file) =>
								file.threadName === t2.threadName &&
								file.folder === state.folder
						)?.files.length || 0;
					return l2 - l1;
				});
			} else {
				try {
					const threadFolderFiles = [...state.files];
					const latestFiles = threadFolderFiles
						.filter((f) => f.folder === state.folder)
						.filter((f) => f.files.length > 0)
						.map((threadFolderFile) => {
							const latestFile = threadFolderFile?.files?.reduce(
								(prev, current) =>
									prev &&
									new Date(prev.date).getTime() >
										new Date(current.date).getTime()
										? prev
										: current,
								threadFolderFile.files[0]
							);
							return {
								name: threadFolderFile.threadName,
								time: latestFile?.date,
								length: threadFolderFile.files.length,
							};
						})
						.sort(
							(a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
						);
					const sortedThreadNames = latestFiles.map((f) => f.name);
					const orderedData = [
						...data
							.filter((t) => sortedThreadNames.includes(t.threadName))
							.sort((a, b) => {
								const aIndex = sortedThreadNames.indexOf(a.threadName);
								const bIndex = sortedThreadNames.indexOf(b.threadName);
								return aIndex - bIndex;
							}),
						...data.filter((t) => !sortedThreadNames.includes(t.threadName)),
					];
					data = orderedData;
				} catch (err) {
					console.error(err);
				}
			}
			data = data.map((monitor, index) => ({
				...monitor,
				id: index + 1,
			}));
			return {
				...state,
				data,
			};
		},
		setFileMonitorWindowsServiceStatus: (
			state,
			action: { type: any; payload: FileMonitorsWindowsServiceStatus }
		) => {
			return {
				...state,
				fileMonitorWindowsServiceStatus: action.payload,
			};
		},
	},
});

export default fileMonitorThreadsSlice.reducer;

export const {
	setData,
	setPage,
	setSort,
	setState,
	setFiles,
	setSearch,
	setFolder,
	setSystem,
	setColumns,
	setPageSize,
	setAutoStart,
	setDataLoading,
	setFilesLoading,
	setFileMonitorThreads,
	setFileMonitorWindowsServiceStatus,
} = fileMonitorThreadsSlice.actions;
