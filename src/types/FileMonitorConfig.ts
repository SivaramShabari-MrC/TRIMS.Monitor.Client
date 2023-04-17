import { FolderType } from ".";

export interface Endpoint {
	addEndPoint: {
		name: string;
		type: string;
		sourceFolder: string | null;
		processedFolder: string | null;
		errorsFolder: string | null;
		destinationFolder: string | null;
		debugFolder: string | null;
		className: string | null;
		systemId: string | null;
		sourceId: string | null;
		assemblyPath: string | null;
	}[];
}

export interface ThreadConfig {
	threadName: string;
	autoStart: boolean;
	sendEmailOnError: boolean;
	errorEmailRecipients: string;
	endpoint: Endpoint;
	files: ThreadFileType[] | null;
}

export interface ThreadFileType {
	name: string;
	date: Date;
}

export interface ThreadFolderFiles {
	threadName: string;
	folder: FolderType;
	folderPath: string;
	files: ThreadFileType[];
}

export interface FileMonitorsWindowsServiceStatus {
	fms: string;
	bfms: string;
}

export enum FMSWindowsServiceCommand {
	Start = 0,
	Stop = 1,
}

export type FileMonitorConfig = ThreadConfig[];
