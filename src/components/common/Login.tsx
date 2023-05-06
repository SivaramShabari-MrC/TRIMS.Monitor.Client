import { Button, Result } from "antd";

const Login = ({ login }: { login: () => void }) => (
	<Result
		status="403"
		title="Not Authorized"
		subTitle="Please login to continue using TRIMS Monitor."
		extra={
			<Button onClick={login} type="primary">
				Login with Microsoft
			</Button>
		}
	/>
);

export default Login;
