import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider as ReduxStoreProvider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "antd-css-utilities/utility.min.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
	<>
		{/* Redux store */}
		<ReduxStoreProvider store={store}>
			{/* React Query */}
			<QueryClientProvider client={queryClient}>
				{/* React Router */}
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ReduxStoreProvider>
	</>
);
