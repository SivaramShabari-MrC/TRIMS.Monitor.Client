export interface Contact {
	displayName: string;
	jobTitle: string;
	mail: string;
	officeLocation: string;
}

export interface ContactSource {
	teamName: string;
	members: Array<{
		email: string;
		role: string;
	}>;
}
