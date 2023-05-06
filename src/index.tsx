import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider as ReduxStoreProvider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "antd-css-utilities/utility.min.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // set stale time to 5 minutes for all queries
		},
	},
});
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
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</ReduxStoreProvider>
	</>
);
