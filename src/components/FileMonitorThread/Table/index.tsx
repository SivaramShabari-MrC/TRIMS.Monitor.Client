import { useEffect, useRef, useState } from "react";
import { getColumns } from "./columns";
import { Table } from "antd";
import {
	setPage,
	setPageSize,
	setSearch,
} from "../../../store/fileMonitorThreadSlice";
import {
	useGetFiles,
	useGetFileMonitorThreads,
} from "../../../api/fileMonitorThread";
import { useDispatch, useSelector } from "../../../store";
import { FolderType, GetFolderTypeKey } from "../../../types";

type FileMonitorThreadTableProps = { isLoading: boolean };
function FileMonitorThreadTable({ isLoading }: FileMonitorThreadTableProps) {
	useGetFileMonitorThreads();
	const state = useSelector((s) => s.fileMonitorThreads);
	const fileMonitorThreads = useSelector(
		(s) => s.fileMonitorThreads.fileMonitorThreads
	);
	const dispatch = useDispatch();
	const tableRef = useRef<any>();
	const [tableHeight, setHeight] = useState(800);
	const [filteredInfo, setFilteredInfo] = useState<any>({});
	const [searchedColumn, setSearchedColumn] = useState("");
	const setSearchText = (text: string) => dispatch(setSearch(text));
	const searchInput = useRef<any>(null);
	const files = useGetFiles();

	const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: any) => {
		clearFilters();
		setSearchText("");
	};
	const handleChange = (pagination: any, filters: any, sorter: any) => {
		dispatch(setPage(pagination.current));
		dispatch(setPageSize(pagination.pageSize));
		setFilteredInfo(filters);
	};

	const dataSource = fileMonitorThreads
		.filter(
			(monitor) =>
				!!monitor.endpoint?.addEndPoint[0][GetFolderTypeKey(state.folder)] ||
				!!monitor.endpoint?.addEndPoint[1][GetFolderTypeKey(state.folder)] ||
				state.folder === FolderType.debugFolder
		)
		.sort((a, b) => {
			if (a.files && b.files) return b.files.length - a.files.length;
			return 0;
		})
		.filter((m) =>
			state.searchQuery
				? m.threadName.toLowerCase().includes(state.searchQuery.toLowerCase())
				: true && !filteredInfo.AutoStart
				? true
				: filteredInfo.AutoStart.length === 2
				? true
				: filteredInfo.AutoStart[0] === true
				? m.autoStart === true
				: m.autoStart === false
		)
		.map((monitor, index) => ({
			...monitor,
			id: index,
		}));
	const columns = getColumns(
		filteredInfo,
		state.folder,
		files.data?.data || [],
		(state.isFilesLoading && !state.includeFileCount) ||
			(files.isLoading && !state.includeFileCount),
		{
			searchQuery: state.searchQuery,
			searchInput,
			searchedColumn,
			handleReset,
			handleSearch,
			setSearchText,
			setSearchedColumn,
		}
	);
	useEffect(() => {
		if (tableRef.current) {
			const tBodyY = tableRef.current.getBoundingClientRect().y;
			let windowHeight = 400;
			if (typeof window !== "undefined") windowHeight = window.innerHeight;
			setHeight(windowHeight - tBodyY - 20);
			tableRef.current.style.maxHeight = tableHeight;
		}
	}, [tableRef]);
	return (
		<>
			<Table
				rowKey="id"
				columns={columns as any}
				className={`mt-4`}
				loading={isLoading}
				dataSource={dataSource}
				onChange={handleChange}
				scroll={{ y: window.innerHeight - 270 }}
				pagination={{
					pageSize: state.perPage,
					pageSizeOptions: [10, 12, 15, 20, 30, 50, 100],
				}}
			/>
		</>
	);
}

export default FileMonitorThreadTable;
