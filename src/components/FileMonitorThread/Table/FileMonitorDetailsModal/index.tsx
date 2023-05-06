import { blue } from "@ant-design/colors";
import { Typography, Modal, Space, Button, List, Spin, Pagination } from "antd";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import {
	useDownLoadFile,
	useGetFileMonitorThreads,
	useGetFiles,
	useMoveFile,
} from "../../../../api/fileMonitorThread";
import { GetFolderTypeKey, ThreadFileType } from "../../../../types";
import { useSelector } from "../../../../store";
import FileListItem from "./FileListItem";

const { Link, Text } = Typography;

export default function FileMonitorModal({
	threadName,
}: {
	threadName: string;
}) {
	const [isOpen, setIsModalOpen] = useState(false);
	const searchText = useSelector((s) => s.fileMonitorThreads.searchQuery);
	const downloadFile = useDownLoadFile();
	const moveFile = useMoveFile();
	const { isLoading, isFetching } = useGetFiles();
	const state = useSelector((s) => s.fileMonitorThreads);
	const path = useSelector((s) => s.fileMonitorThreads.folder);

	useGetFileMonitorThreads();
	const showModal = () => setIsModalOpen(true);
	const handleOk = () => setIsModalOpen(false);
	const handleCancel = () => setIsModalOpen(false);

	const [page, setPage] = useState(0);
	const pageSize = 10;
	const [files, setFiles] = useState<ThreadFileType[] | undefined>([]);
	useEffect(() => {
		const files = state.files
			?.find((f) => f.threadName === threadName && f.folder === state.folder)
			?.files.slice();
		setFiles(files);
	}, [state.files, state.data]);

	const dataSource = files
		?.sort((a, b) => {
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
		})
		.slice(page * pageSize, page * pageSize + pageSize);

	return (
		<>
			<Link onClick={showModal}>
				<Highlighter
					style={{ color: blue[5] }}
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
					}}
					searchWords={[searchText]}
					textToHighlight={threadName}
				/>
			</Link>
			<Modal
				centered
				open={isOpen}
				width={Math.max(window.innerWidth * 0.9, 500)}
				style={{ minHeight: window.innerHeight * 0.8 }}
				title={
					<>
						{`Files in ${GetFolderTypeKey(path)} - ${threadName}`}
						<Text>
							{(downloadFile.isLoading ||
								moveFile.isLoading ||
								isLoading ||
								isFetching) && <Spin className="ml-2" />}
						</Text>
					</>
				}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<>
						<Space>
							<Pagination
								defaultPageSize={pageSize}
								onChange={(page, size) => {
									setPage(page - 1);
								}}
								total={files?.length || 0}
								showSizeChanger={false}
							/>
							<Button className="ml-2" onClick={handleCancel}>
								Close
							</Button>
						</Space>
					</>,
				]}
			>
				<Space
					style={{
						height: Math.max(window.innerHeight * 0.8, 400),
						overflowY: "auto",
						width: "100%",
					}}
					size="small"
					direction="vertical"
				>
					<List
						size="small"
						bordered={false}
						dataSource={dataSource || []}
						renderItem={(file, index) => (
							<FileListItem
								key={threadName + state.folder.toString() + index}
								file={file}
								threadName={threadName}
							/>
						)}
					/>
				</Space>
			</Modal>
		</>
	);
}
