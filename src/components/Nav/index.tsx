import { Layout } from "antd";
import SidenavContent from "./SidenavContent";
import * as styles from "./Nav.module.css";
import { EnvironmentDropDown } from "./EnvironmentDropdown";
const { Header, Sider, Content } = Layout;

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
					<EnvironmentDropDown />
				</Header>
				<Content className={styles.content}>{children}</Content>
			</Layout>
		</Layout>
	);
}
