import { Button, Result } from "antd";

const Login = ({ login }: { login: () => void }) => (
	<Result
		status="403"
		title="Not Authorized"
		subTitle="Sorry, you are not authorized to access this page."
		extra={
			<Button onClick={login} type="primary">
				Login with AzureAD
			</Button>
		}
	/>
);

export default Login;
