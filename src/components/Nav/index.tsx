import { Layout, Space } from "antd";
import SidenavContent from "./SidenavContent";
import * as styles from "./Nav.module.css";
import config from "../../config";
const { Header, Sider, Content } = Layout;
import { Card } from "antd";
import { blue } from "@ant-design/colors";

export default function SidebarWithHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Layout className={styles.mainLayout}>
			<Sider
				style={{ backgroundColor: "white" }}
				width={255}
				className={styles.sider}
			>
				<SidenavContent />
			</Sider>
			<Layout className={styles.contentLayout}>
				<Header style={{ backgroundColor: "white" }} className={styles.header}>
					<Card
						style={{ borderColor: blue[4], borderWidth: "1px" }}
						size="small"
					>
						{config.environmentName}
					</Card>
				</Header>
				<Content className={styles.content}>{children}</Content>
			</Layout>
		</Layout>
	);
}
