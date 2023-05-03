import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./components/Nav";
import FileMonitorThreads from "./components/FileMonitorThread";
import { UserAgentApplication } from "msal";
import config from "./config";
import { useEffect } from "react";
import { setUser, useDispatch, useSelector } from "./store";
import Login from "./components/common/Login";
import { message } from "antd";
import TransactionReport from "./components/TransactionReport";
import BAIFileStatus from "./components/BAIFilleStatus";
import Contacts from "./components/Contacts";
import ScheduledTasks from "./components/ScheduledTasks";

const userAgentApplication = new UserAgentApplication({
	auth: {
		clientId: config.appId!,
		redirectUri: config.redirectUrl!,
		authority: config.authority,
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: true,
	},
});
const LOCAL_STORAGE_USER = "TRIMS-Monitor-User";
const App = () => {
	const state = useSelector((state) => state.global);
	const dispatch = useDispatch();
	const localStorageUser = JSON.parse(
		sessionStorage.getItem(LOCAL_STORAGE_USER) || "null"
	);
	const loginUserAgentApplication = async () => {
		try {
			let response = await userAgentApplication.loginPopup({
				scopes: config.scope,
				prompt: "select_account",
			});
			if (response != null && response.idTokenClaims != null) {
				dispatch(setUser(response.account.userName));
				sessionStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response));
			} else {
			}
		} catch (error) {
			dispatch(setUser(null));
			console.error(error);
		}
	};
	useEffect(() => {
		if (localStorageUser === null) {
			dispatch(setUser(null));
			loginUserAgentApplication();
		} else {
			if (new Date(localStorageUser.expiresOn) > new Date()) {
				dispatch(setUser(localStorageUser.account.userName));
			} else {
				message.warning("Session expired! Login again to continue");
				sessionStorage.removeItem(LOCAL_STORAGE_USER);
				dispatch(setUser(null));
			}
		}
	}, []);
	return (
		<>
			{state.user === null ? (
				<>
					<Login login={loginUserAgentApplication} />
				</>
			) : (
				<SidebarWithHeader>
					<Routes>
						<Route
							path="/fileMonitorThreads"
							element={<FileMonitorThreads />}
						/>
						<Route path="/transactionReport" element={<TransactionReport />} />
						<Route path="/baiFileStatus" element={<BAIFileStatus />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/scheduledTasks" element={<ScheduledTasks />} />
					</Routes>
				</SidebarWithHeader>
			)}
		</>
	);
};

export default App;
