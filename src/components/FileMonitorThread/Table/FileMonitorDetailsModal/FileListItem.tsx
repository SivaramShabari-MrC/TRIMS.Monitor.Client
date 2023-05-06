import { Button, List } from "antd";
import { useDownLoadFile } from "../../../../api/fileMonitorThread";
import { useSelector } from "../../../../store";
import { ThreadFileType } from "../../../../types";
import { DownloadOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import downloadFileInClient from "./downloadFile";
import MoveToFolderDropdown from "./MoveToFolderDropdown";
import moment from "moment";

const FileListItem = ({
	file,
	threadName,
}: {
	file: ThreadFileType;
	threadName: string;
}) => {
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

export default FileListItem;
