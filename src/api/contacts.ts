import { useQuery } from "@tanstack/react-query";
import contacts from "../components/Contacts/conacts.json";
import { message } from "antd";
import api from ".";
import { Contact, ContactSource } from "../types/Contact";

const getContacts = () =>
	new Promise<any>((resolve) => resolve(contacts as ContactSource[]));

const getPhoto = (email: string) => api.get<string>(`/contact/photo/${email}`);

const getContactDetails = (emailIds: string[]) =>
	api.get<Contact[]>("/contacts?", {
		params: { emailIds: emailIds.join(",") },
	});

export const useGetAllContacts = () => {
	return useQuery(["allContacts"], () => getContacts(), {
		onSettled: (data, error) => {
			if (error) {
				message.error("Unable to get contacts");
				console.error(error);
			}
		},
	});
};

export const useGetContacts = (emailIds: string[]) => {
	return useQuery(
		["contacts", ...emailIds],
		() => getContactDetails(emailIds.sort((a, b) => (a < b ? 1 : -1))),
		{
			enabled: !!emailIds && emailIds?.length > 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			onSettled: (data, error) => {
				if (error || !data) {
					message.error("Unable to get contacts");
					console.error(error);
				} else
					return data.data?.sort((a, b) =>
						a.displayName < b.displayName ? 1 : -1
					);
			},
		}
	);
};

export const useGetPhoto = (email: string) => {
	return useQuery(["contactphoto", email], () => getPhoto(email), {
		enabled: !!email,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		onSettled: (data, error) => {
			if (error) {
				console.error("Failed to load image for " + email);
			}
		},
		retry: 0,
	});
};
