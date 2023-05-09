import { useEffect, useRef, useState } from "react";
import { getColumns } from "./columns";
import { Table } from "antd";
import { setPage, setPageSize } from "../../../store/fileMonitorThreadSlice";
import { useDispatch, useSelector } from "../../../store";
import "./Table.css";
import { useGetFiles } from "../../../api/fileMonitorThread";
type FileMonitorThreadTableProps = { isLoading: boolean };
function FileMonitorThreadTable({ isLoading }: FileMonitorThreadTableProps) {
	const state = useSelector((s) => s.fileMonitorThreads);
	const dispatch = useDispatch();
	const tableRef = useRef<any>();
	const [tableHeight, setHeight] = useState(800);

	const handleChange = (pagination: any, filters: any, sorter: any) => {
		dispatch(setPage(pagination.current));
		dispatch(setPageSize(pagination.pageSize));
	};

	const files = useGetFiles();
	const columns = getColumns(state.folder, state.files, files.isLoading);

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
		<Table
			rowKey="id"
			columns={columns as any}
			className={`mt-4`}
			loading={isLoading}
			dataSource={state.data}
			onChange={handleChange}
			scroll={{ x: "max-content", y: window.innerHeight - 275 }}
			pagination={{
				showSizeChanger: true,
				pageSize: state.perPage,
				pageSizeOptions: [10, 12, 15, 20, 30, 50, 100],
				hideOnSinglePage: false,
			}}
		/>
	);
}

export default FileMonitorThreadTable;
