import axios, { AxiosInstance } from "axios";
import config from "../config";

const baseURL = config.TRIMSMonitorAPI;
const api: AxiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export default api;
