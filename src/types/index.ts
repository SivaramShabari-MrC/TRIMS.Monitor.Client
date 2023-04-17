export * from "./FileMonitorConfig";
export enum EnvironmentType {
	Development = 0,
	QA = 1,
	UAT = 2,
	Production = 3,
}

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
