import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:5105";
const api: AxiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Authorization: `Bearer ${window.MSAL_AUTH_TOKEN}`,
	},
});

export default api;
