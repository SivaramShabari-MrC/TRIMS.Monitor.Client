export * from "./FileMonitorConfig";

export enum SystemType {
	FMS = 0,
	BFMS = 1,
}

export enum FolderType {
	sourceFolder = 0,
	errorsFolder = 1,
	processedFolder = 2,
	debugFolder = 3,
	destinationFolder = 4,
}

export enum FMSWindowsServiceCommand {
	Start = 0,
	Stop = 1,
}

type FolderKeyType =
	| "sourceFolder"
	| "errorsFolder"
	| "processedFolder"
	| "debugFolder"
	| "destinationFolder";

export function GetFolderTypeKey(folder: FolderType): FolderKeyType {
	switch (folder) {
		case 0:
			return "sourceFolder";
		case 1:
			return "errorsFolder";
		case 2:
			return "processedFolder";
		case 3:
			return "debugFolder";
		case 4:
			return "destinationFolder";
		default:
			return "sourceFolder";
	}
}

export function GetFolderName(folder: FolderType): string {
	switch (folder) {
		case 0:
			return "Source Folder";
		case 1:
			return "Errors Folder";
		case 2:
			return "Processed Folder";
		case 3:
			return "Debug Folder";
		case 4:
			return "Destination Folder";
		default:
			return "Source Folder";
	}
}
