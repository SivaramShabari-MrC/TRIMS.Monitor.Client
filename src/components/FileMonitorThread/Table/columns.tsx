import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import { Popover, Space, Spin, Typography } from "antd";
import { red, green, blue } from "@ant-design/colors";
import { CopyOutlined } from "@ant-design/icons";
import {
	FolderType,
	GetFolderTypeKey,
	ThreadConfig,
	ThreadFolderFiles,
} from "../../../types";
import FileMonitorModal from "./FileMonitorDetailsModal";
import SearchDropdown from "./SearchDropdown";
const { Text } = Typography;

export const getColumns = (
	folder: FolderType,
	files: ThreadFolderFiles[],
	isFileCountLoading: boolean
) => [
	{
		title: "#",
		key: "SNO",
		width: 60,
		dataIndex: "id",
	},
	{
		title: (
			<div>
				Thread Name <SearchDropdown />
			</div>
		),
		key: "ThreadName",
		width: 400,
		dataIndex: "ThreadName",
		render: (text: any, record: ThreadConfig) => (
			<FileMonitorModal threadName={record.threadName} />
		),
	},
	{
		title: "AutoStart",
		key: "AutoStart",
		dataIndex: "AutoStart",
		align: "center",
		width: 100,
		filters: [
			{
				text: "True",
				value: true,
			},
			{
				text: "False",
				value: false,
			},
		],
		render: (text: any, record: any, index: any) => {
			if (record.autoStart === true)
				return (
					<CheckCircleOutlined style={{ fontSize: 17, color: green.primary }} />
				);
			else
				return (
					<CloseCircleOutlined style={{ fontSize: 17, color: red.primary }} />
				);
		},
	},
	{
		title: (
			<div>
				File Count{" "}
				{isFileCountLoading && (
					<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
				)}
			</div>
		),
		key: "file-count",
		align: "center",
		width: 160,
		dataIndex: "Files",
		render: (text: any, record: ThreadConfig, index: any) => {
			const fileCount = files?.find(
				(f) => f.threadName === record.threadName && f.folder === folder
			)?.files.length;
			if (isFileCountLoading) return <Text>...</Text>;

			if (
				GetFolderTypeKey(folder) !== "debugFolder" &&
				!record.endpoint.addEndPoint[0][GetFolderTypeKey(folder)] &&
				!record.endpoint.addEndPoint[1][GetFolderTypeKey(folder)]
			)
				return <Text>-</Text>;
			return <Text>{fileCount || "0"}</Text>;
		},
	},
	{
		title: "Path",
		key: "path",
		dataIndex: "path",
		// width: 850,
		render: (text: any, record: ThreadConfig, index: any) => {
			const _folder =
				folder === FolderType.debugFolder ? FolderType.sourceFolder : folder;
			const debugPath = folder === FolderType.debugFolder ? "\\Debug" : "";
			let path: string =
				record.endpoint?.addEndPoint[0][GetFolderTypeKey(_folder)] ||
				record.endpoint?.addEndPoint[1][GetFolderTypeKey(_folder)] ||
				"Invalid Path";
			if (path !== "Invalid Path") path += debugPath;
			return (
				<Space direction="horizontal" style={{ overflowX: "clip" }}>
					<Popover content={"Copy Path"} trigger="hover">
						<CopyOutlined
							style={{ color: blue[5] }}
							className="mr-2 text-lg"
							onClick={() => {
								navigator.clipboard.writeText(path);
							}}
						/>
					</Popover>
					<p>{path.toLowerCase()}</p>
				</Space>
			);
		},
	},
];
