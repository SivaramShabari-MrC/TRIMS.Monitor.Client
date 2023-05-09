import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./components/Nav";
import FileMonitorThreads from "./components/FileMonitorThread";
import { UserAgentApplication } from "msal";
import config, { getUser, setUser as setLocalUser, removeUser } from "./config";
import { useEffect, useState } from "react";
import { setUser as setReduxUser, useDispatch, useSelector } from "./store";
import Login from "./components/common/Login";
import { Spin, message } from "antd";
import TransactionReport from "./components/TransactionReport";
import BAIFileStatus from "./components/BAIFilleStatus";
import Contacts from "./components/Contacts";
import ScheduledTasks from "./components/ScheduledTasks";
import Home from "./components/Home";
import Loading from "./components/common/Loading";

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

const App = () => {
	const state = useSelector((state) => state.global);
	const dispatch = useDispatch();
	const [isUserLoaded, setIsUserLoaded] = useState(false);
	const loginUserAgentApplication = async () => {
		try {
			let response = await userAgentApplication.loginPopup({
				scopes: config.scope,
				prompt: "select_account",
			});
			if (response != null && response.idTokenClaims != null) {
				dispatch(setReduxUser(response.account.name));
				setIsUserLoaded(true);
				setLocalUser(response);
			} else throw new Error("User login error");
		} catch (error) {
			dispatch(setReduxUser(null));
			console.error(error);
		}
	};

	useEffect(() => {
		if (getUser() === null) {
			dispatch(setReduxUser(null));
			loginUserAgentApplication();
			setIsUserLoaded(true);
		} else {
			dispatch(setReduxUser(getUser().account.name));
			setIsUserLoaded(true);
		}
		const checkValidity = setInterval(() => {
			if (getUser() !== null && new Date(getUser().expiresOn) < new Date()) {
				message.warning("Session expired! Login again to continue");
				removeUser();
				dispatch(setReduxUser(null));
			}
			return () => {
				clearInterval(checkValidity);
			};
		}, 10 * 1000); //check every 10 seconds
	}, []);

	return (
		<>
			<SidebarWithHeader>
				{!isUserLoaded ? (
					<Loading message="" />
				) : !state.user ? (
					<>
						<Login login={() => loginUserAgentApplication()} />
					</>
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/fileMonitorThreads"
							element={<FileMonitorThreads />}
						/>
						<Route path="/transactionReport" element={<TransactionReport />} />
						<Route path="/baiFileStatus" element={<BAIFileStatus />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/scheduledTasks" element={<ScheduledTasks />} />
					</Routes>
				)}
			</SidebarWithHeader>
		</>
	);
};

export default App;
