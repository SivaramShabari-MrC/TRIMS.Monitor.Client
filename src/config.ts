export default {
	appId: import.meta.env.VITE_TRIMS_MONITOR_APP_ID!,
	redirectUrl: import.meta.env.VITE_TRIMS_MONITOR_REDIRECT_URL!,
	scope: ["user.read"],
	secAdminAPI: import.meta.env.VITE_TRIMS_MONITOR_ENVIRONMENT_NAME!,
	environmentName: import.meta.env.VITE_TRIMS_MONITOR_API_URL!,
	authority:
		"https://login.microsoftonline.com/7653af48-8d24-4c43-bbaa-b8547139c0f5",
};
