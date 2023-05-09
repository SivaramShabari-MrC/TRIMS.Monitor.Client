import { Spin } from "antd";
import styles from "./Loading.module.css";
import { LoadingOutlined } from "@ant-design/icons";
function Loading({ message }: { message: string }) {
	const icon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
	return (
		<div className={styles.container}>
			<div>
				<Spin indicator={icon} tip={message} size="large" />
			</div>
		</div>
	);
}

export default Loading;
