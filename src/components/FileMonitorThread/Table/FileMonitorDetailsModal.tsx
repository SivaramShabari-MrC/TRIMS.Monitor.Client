import { blue } from "@ant-design/colors";
import { DownloadOutlined, DownOutlined } from "@ant-design/icons";
import { Typography, Modal, Space, Button, List, Spin, Dropdown } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import {
	useDownLoadFile,
	useGetFileMonitorThreads,
	useMoveFile,
} from "../../../api/fileMonitorThread";
import downloadFileInClient from "./downloadFile";
import {
	FolderType,
	GetFolderTypeKey,
	ThreadConfig,
	ThreadFileType,
} from "../../../types";
import { useSelector } from "../../../store";
const { Link, Text } = Typography;

type FileMonitorModalProps = {
	data: ThreadConfig;
	type: any;
	searchText: string;
	textToHighlight: string;
};
export default function MonitorModal({
	data,
	type,
	searchText,
	textToHighlight,
}: FileMonitorModalProps) {
	const [isOpen, setIsModalOpen] = useState(false);
	const downloadFile = useDownLoadFile();
	const moveFile = useMoveFile();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const state = useSelector((s) => s.fileMonitorThreads);
	useGetFileMonitorThreads();
	const fileMonitorThreads = state.fileMonitorThreads;
	const path = useSelector((s) => s.fileMonitorThreads.folder);
	const defaultFileList = fileMonitorThreads.find(
		(m) => m.threadName === data.threadName
	)?.files;

	return (
		<>
			{type === "Link" ? (
				<Link onClick={showModal}>{data.threadName}</Link>
			) : (
				<Link onClick={showModal}>
					<Highlighter
						style={{ color: blue[5] }}
						highlightStyle={{
							backgroundColor: "#ffc069",
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={data.threadName}
					/>
				</Link>
			)}
			<Modal
				centered
				open={isOpen}
				width={Math.max(window.innerWidth * 0.8, 500)}
				title={
					<>
						{`Files in ${GetFolderTypeKey(path)} - ${data.threadName}`}
						<Text>
							{(downloadFile.isLoading || moveFile.isLoading) && (
								<Spin className="ml-2" />
							)}
						</Text>
					</>
				}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[<Button onClick={handleCancel}>Close</Button>]}
			>
				<Space
					style={{
						maxHeight: Math.max(window.innerHeight / 1.5, 400),
						overflowY: "auto",
						width: "100%",
					}}
					size="small"
					direction="vertical"
				>
					{fileMonitorThreads?.find((m) => m.threadName === data.threadName)
						?.files?.length! > 0 ? (
						<>
							<List
								size="small"
								bordered={false}
								dataSource={
									[...defaultFileList!].sort((a, b) => {
										if (!!a && !!b) {
											try {
												const _a = new Date(a?.date).getTime();
												const _b = new Date(b?.date).getTime();
												return _b - _a;
											} catch (e) {
												console.error("Date", e);
												return 0;
											}
										}
										return 0;
									}) || []
								}
								renderItem={(file, index) => (
									<FileListItem
										key={index}
										file={file}
										threadName={data.threadName}
									/>
								)}
							/>
						</>
					) : (
						<>
							{state.files
								?.filter((f) => f.threadName === data.threadName)
								?.map((file, index) => (
									<List
										key={index}
										size="small"
										bordered={false}
										dataSource={[...file.files].sort((a, b) => {
											if (a && b) {
												try {
													const _a = new Date(a?.date).getTime();
													const _b = new Date(b?.date).getTime();
													return _b - _a;
												} catch (e) {
													console.error("Date", e);
													return 0;
												}
											}
											return 0;
										})}
										renderItem={(file, index) => (
											<FileListItem
												key={index}
												file={file}
												threadName={data.threadName}
											/>
										)}
									/>
								))}
						</>
					)}
				</Space>
			</Modal>
		</>
	);
}

const FileListItem = ({
	file,
	threadName,
}: {
	file: ThreadFileType;
	threadName: string;
}) => {
	const environment = useSelector((s) => s.global.environment);
	const { system, folder } = useSelector((s) => s.fileMonitorThreads);
	const downloadFile = useDownLoadFile();
	return (
		<List.Item
			actions={[
				<Button
					disabled={downloadFile.isLoading}
					loading={downloadFile.isLoading}
					icon={<DownloadOutlined className="" style={{ color: blue[5] }} />}
					onClick={async () => {
						const fileData = await downloadFile.mutateAsync({
							environment,
							system,
							folder,
							fileName: file.name,
							threadName,
						});
						downloadFileInClient(file.name, fileData, undefined);
					}}
				>
					Download
				</Button>,
				<MoveToFolderDropdown threadName={threadName} fileName={file.name} />,
			]}
		>
			<List.Item.Meta
				title={file.name}
				description={
					<i style={{ color: blue[5] }}>{moment(file.date).format("llll")}</i>
				}
			/>
		</List.Item>
	);
};

const MoveToFolderDropdown = ({
	fileName,
	threadName,
}: {
	fileName: string;
	threadName: string;
}) => {
	const moveFile = useMoveFile();
	const environment = useSelector((s) => s.global.environment);
	const { system, folder } = useSelector((s) => s.fileMonitorThreads);
	const [items, setItems] = useState<any[]>([]);
	const [canMoveFiles, setCanMoveFiles] = useState(true);
	useEffect(() => {
		if (folder === FolderType.errorsFolder) {
			setItems([
				{ label: "SourceFolder", key: FolderType.sourceFolder },
				{ label: "DebugFolder", key: FolderType.debugFolder },
			]);
		} else if (folder === FolderType.sourceFolder) {
			setItems([{ label: "DebugFolder", key: FolderType.debugFolder }]);
		} else setCanMoveFiles(false);
	}, []);
	return (
		<>
			<Dropdown
				disabled={!canMoveFiles}
				menu={{
					onClick: async (info) => {
						await moveFile.mutateAsync({
							environment,
							system,
							fileName,
							threadName,
							from: folder,
							to: parseInt(info.key),
						});
					},
					items,
				}}
			>
				<Button loading={moveFile.isLoading} disabled={moveFile.isLoading}>
					<Space>
						Move to Folder
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
		</>
	);
};
