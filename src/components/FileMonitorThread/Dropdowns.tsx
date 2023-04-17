import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Space } from "antd";
import {
	setFileMonitorWindowsServiceStatus,
	setFolder,
	setSystem,
} from "../../store/fileMonitorThreadSlice";
import { useDispatch, useSelector } from "../../store";
import {
	FMSWindowsServiceCommand,
	FolderType,
	GetFolderTypeKey,
	SystemType,
} from "../../types";
export const SystemMenu = () => {
	const system = useSelector((state) => state.fileMonitorThreads.system);
	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				onClick: (info) => {
					dispatch(setSystem(parseInt(info.key)));
				},
				items: [
					{
						label: "FMS",
						key: SystemType.FMS,
					},
					{
						label: "BFMS",
						key: SystemType.BFMS,
					},
				],
			}}
		>
			<Button>
				<Space>
					System: {system === 0 ? "FMS" : "BFMS"}
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export const FolderMenu = () => {
	const folder = useSelector((state) => state.fileMonitorThreads.folder);
	const foldeTypeString =
		GetFolderTypeKey(folder).charAt(0).toUpperCase() +
		GetFolderTypeKey(folder).slice(1);

	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				onClick: (info) => {
					dispatch(setFolder(parseInt(info.key)));
				},
				items: [
					{
						label: "SourceFolder",
						key: FolderType.sourceFolder,
					},
					{
						label: "ProcessedFolder",
						key: FolderType.processedFolder,
					},
					{
						label: "ErrorsFolder",
						key: FolderType.errorsFolder,
					},
					{
						label: "DestinationFolder",
						key: FolderType.destinationFolder,
					},
					{
						label: "DebugFolder",
						key: FolderType.debugFolder,
					},
				],
			}}
		>
			<Button>
				<Space>
					{foldeTypeString}
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export const FMSStatusMenu = () => {
	const system = useSelector(
		(state) => state.fileMonitorThreads.fileMonitorWindowsServiceStatus
	);
	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				onClick: (info) => {},
				items: [
					{
						label: "Force Start",
						key: FMSWindowsServiceCommand.Start,
					},
					{
						label: "Force Stop",
						key: FMSWindowsServiceCommand.Stop,
					},
				],
			}}
		>
			<Button loading={system.fms === "Loading..."}>
				<Space>
					FMS Status: {system.fms}
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export const BFMSStatusMenu = () => {
	const system = useSelector(
		(state) => state.fileMonitorThreads.fileMonitorWindowsServiceStatus
	);
	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				onClick: (info) => {},
				items: [
					{
						label: "Force Start",
						key: FMSWindowsServiceCommand.Start,
					},
					{
						label: "Force Stop",
						key: FMSWindowsServiceCommand.Stop,
					},
				],
			}}
		>
			<Button loading={system.bfms === "Loading..."}>
				<Space>
					BFMS Status: {system.bfms}
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};
