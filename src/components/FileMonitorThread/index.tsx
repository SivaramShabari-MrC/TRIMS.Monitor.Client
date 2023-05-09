import { useEffect } from "react";
import Table from "./Table";
import {
	useGetFiles,
	useGetFileMonitorThreads,
	useGetFileMonitorWindowsServiceStatus,
} from "../../api/fileMonitorThread";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import { setData } from "../../store/fileMonitorThreadSlice";
import { Space, Typography, Button, message } from "antd";
import {
	BFMSStatusMenu,
	FMSStatusMenu,
	FolderMenu,
	SortDropdown,
	SystemMenu,
} from "./Dropdowns";
import { useDispatch, useSelector } from "../../store";
import { SystemType } from "../../types";

function FileMonitorThreads() {
	const state = useSelector((s) => s.fileMonitorThreads);
	const fms = useGetFileMonitorThreads(SystemType.FMS);
	const bfms = useGetFileMonitorThreads(SystemType.BFMS);
	useGetFileMonitorWindowsServiceStatus();
	const files = useGetFiles();
	const dispatch = useDispatch();
	const { system, page, perPage, folder, searchQuery, sort } = state;
	useEffect(() => {
		dispatch(setData());
	}, [system, page, perPage, folder, searchQuery, sort]);

	return (
		<>
			<Space wrap>
				<Space
					className="px-2 py-1"
					style={{
						background: "white",
						border: "1px solid #ddd",
					}}
				>
					<FilterOutlined />
				</Space>
				<Button
					icon={<ReloadOutlined />}
					onClick={() => {
						fms.refetch();
						bfms.refetch();
						files.refetch();
						message.info("Refetching fileMonitorThreads");
					}}
				/>
				<SystemMenu />
				<SortDropdown />
				<FolderMenu />
				<Space>
					<FMSStatusMenu />
				</Space>
				<Space>
					<BFMSStatusMenu />
				</Space>
			</Space>
			{state.data && <Table isLoading={fms.isLoading || bfms.isLoading} />}
		</>
	);
}

export default FileMonitorThreads;
