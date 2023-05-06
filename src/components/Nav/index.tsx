import { Layout, Space, Tag, Typography } from "antd";
import SidenavContent from "./SidenavContent";
import * as styles from "./Nav.module.css";
import config from "../../config";
const { Header, Sider, Content } = Layout;
import { Card } from "antd";
import { blue } from "@ant-design/colors";
import moment from "moment";

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
				<Header className={styles.header}>
					<Tag
						color="processing"
						style={{ fontWeight: "bold", marginRight: 18, color: blue[5] }}
					>
						{moment().format("dddd - LL")}
					</Tag>
					<Tag
						style={{ fontWeight: "bold" }}
						className="ma-2"
						color="processing"
					>
						{config.environmentName}
					</Tag>
				</Header>
				<Content className={styles.content}>{children}</Content>
			</Layout>
		</Layout>
	);
}
