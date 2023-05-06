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
import Loading from "../common/Loading";

function FileMonitorThreads() {
	const state = useSelector((s) => s.fileMonitorThreads);
	const { refetch, isLoading } = useGetFileMonitorThreads(state.system);
	useGetFileMonitorWindowsServiceStatus();
	const files = useGetFiles();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setData());
	}, [state.page, state.perPage, state.folder, state.searchQuery, state.sort]);

	return (
		<>
			{state.isDataLoading ? (
				<Loading message={`Loading FMS and BFMS monitor threads...`} />
			) : (
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
								refetch();
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
					{state.data && <Table isLoading={isLoading} />}
				</>
			)}
		</>
	);
}

export default FileMonitorThreads;
