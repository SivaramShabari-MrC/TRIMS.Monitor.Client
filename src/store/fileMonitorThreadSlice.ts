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
	filteredThreadsCount: number;
	includeFileCount: boolean;
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
	filteredThreadsCount: 0,
	includeFileCount: false,
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
		setIncludeFileCount: (state, action) => ({
			...state,
			includeFileCount: action.payload,
		}),
		toggleIncludeFileCount: (state) => ({
			...state,
			includeFileCount: !state.includeFileCount,
		}),
		setDataLoading: (state, action) => ({
			...state,
			isDataLoading: action.payload,
		}),
		setFilesLoading: (state, action) => ({
			...state,
			isFilesLoading: action.payload,
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
			const files = [];
			for (const file of action.payload) {
				files.push(file);
			}
			return { ...state, files: [...files] };
		},
		setData: (state) => {
			let fileMonitorThreads = current(state.fileMonitorThreads);
			fileMonitorThreads = fileMonitorThreads
				.filter((m) => {
					return !!state.searchQuery
						? m.threadName
								.toLowerCase()
								.includes(state.searchQuery.toLowerCase())
						: true;
				})
				.filter(
					(monitor) =>
						!!monitor.endpoint?.addEndPoint[0][
							GetFolderTypeKey(state.folder)
						] ||
						!!monitor.endpoint?.addEndPoint[1][
							GetFolderTypeKey(state.folder)
						] ||
						state.folder === FolderType.debugFolder
				)
				.sort((a, b) => {
					if (a.files && b.files) return b.files.length - a.files.length;
					return 0;
				});

			const startIndex =
				fileMonitorThreads.length <= state.perPage
					? 1
					: (state.page - 1) * state.perPage;
			const endIndex = Math.min(
				state.page * state.perPage,
				fileMonitorThreads.length
			);
			const data = fileMonitorThreads.slice(startIndex, endIndex);
			const newState = {
				...state,
				filteredThreadsCount: fileMonitorThreads.length,
				data,
			};
			return newState;
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
	setIncludeFileCount,
	setFileMonitorThreads,
	toggleIncludeFileCount,
	setFileMonitorWindowsServiceStatus,
} = fileMonitorThreadsSlice.actions;
