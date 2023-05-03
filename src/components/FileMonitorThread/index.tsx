import { useEffect } from "react";
import Table from "./Table";
import {
	useGetFiles,
	useGetFileMonitorThreads,
	useGetFileMonitorWindowsServiceStatus,
} from "../../api/fileMonitorThread";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import { setIncludeFileCount } from "../../store/fileMonitorThreadSlice";
import { Space, Typography, Switch, Button, message } from "antd";
import {
	BFMSStatusMenu,
	FMSStatusMenu,
	FolderMenu,
	SystemMenu,
} from "./Dropdowns";
import { useDispatch, useSelector } from "../../store";
import Loading from "../common/Loading";
import { GetEnvironmentName } from "../Nav/EnvironmentDropdown";
const { Text } = Typography;
function FileMonitorThreads() {
	const state = useSelector((s) => s.fileMonitorThreads);
	const env = useSelector((s) => s.global.environment);
	const { refetch, isLoading } = useGetFileMonitorThreads();
	useGetFileMonitorWindowsServiceStatus();
	const files = useGetFiles();
	const dispatch = useDispatch();

	useEffect(() => {
		files.refetch();
	}, [state.page, state.perPage, state.folder]);

	return (
		<>
			{state.isDataLoading ? (
				<Loading
					message={`Loading FMS and BFMS monitor threads from ${GetEnvironmentName(
						env
					)}...`}
				/>
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
						<Space
							className="px-2 py-1"
							style={{
								background: "white",
								border: "1px solid #ddd",
							}}
						>
							<Text>Sort By File Count</Text>
							<Switch
								className="ml-2"
								size="small"
								defaultChecked={state.includeFileCount}
								onChange={(checked) => {
									dispatch(setIncludeFileCount(checked));
								}}
							/>
						</Space>
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
