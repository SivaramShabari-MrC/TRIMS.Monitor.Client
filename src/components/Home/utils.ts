import { ThreadFolderFiles } from "../../types";

export function truncate(str: string) {
	const len = 20;
	if (str.length > len) {
		return str.substring(0, len) + "...";
	} else {
		return str;
	}
}

export const getUnprocessedFiles = (
	data: ThreadFolderFiles[] | undefined,
	cutOffTimeMs: number
) => {
	return data
		?.map((t) => {
			const filteredFiles = t.files.filter((f) => {
				const now = new Date();
				const fileDate = new Date(f.date);
				const diff = now.getTime() - fileDate.getTime();
				return diff <= cutOffTimeMs;
			});
			return { ...t, files: filteredFiles };
		})
		?.filter((t) => t.files.length > 0)
		.sort((a, b) => b.files.length - a.files.length)
		?.slice(0, 5)
		.map((thread, idx) => ({
			key: idx,
			threadName: truncate(thread.threadName),
			fileCount: thread.files.length,
		}));
};

export const getErrorFiles = (data: ThreadFolderFiles[] | undefined) => {
	return data
		?.filter((t) => t.files.length > 0)
		?.sort((a, b) => {
			return b.files.length - a.files.length;
		})
		.slice(0, 5)
		.map((thread, idx) => ({
			key: idx,
			threadName: truncate(thread.threadName),
			fileCount: thread.files.length,
		}));
};

export const getTotalFileCount = (data: ThreadFolderFiles[] | undefined) => {
	return data?.reduce((total, current) => {
		return total + current.files?.length;
	}, 0);
};
