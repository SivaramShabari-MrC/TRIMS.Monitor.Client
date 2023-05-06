import { useEffect, useState } from "react";
import { useMoveFile } from "../../../../api/fileMonitorThread";
import { useSelector } from "../../../../store";
import { FolderType } from "../../../../types";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const MoveToFolderDropdown = ({
	fileName,
	threadName,
}: {
	fileName: string;
	threadName: string;
}) => {
	const moveFile = useMoveFile();
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
		} else if (folder === FolderType.debugFolder) {
			setItems([{ label: "SourceFolder", key: FolderType.sourceFolder }]);
		} else setCanMoveFiles(false);
	}, []);
	return (
		<>
			<Dropdown
				disabled={!canMoveFiles}
				menu={{
					onClick: async (info) => {
						await moveFile.mutateAsync({
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

export default MoveToFolderDropdown;
