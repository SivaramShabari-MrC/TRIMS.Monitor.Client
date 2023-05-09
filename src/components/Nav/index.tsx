import { Button, Layout, Space, Tag, Typography } from "antd";
import SidenavContent from "./SidenavContent";
import * as styles from "./Nav.module.css";
import config, { removeUser } from "../../config";
const { Header, Sider, Content } = Layout;
import { blue } from "@ant-design/colors";
import moment from "moment";
import { LogoutOutlined } from "@ant-design/icons";
import { setUser, useDispatch, useSelector } from "../../store";

export default function SidebarWithHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useSelector((s) => s.global.user);
	const dispatch = useDispatch();
	return (
		<Layout className={styles.mainLayout}>
			<Sider
				style={{ backgroundColor: "white" }}
				width={240}
				className={styles.sider}
			>
				<SidenavContent />
			</Sider>
			<Layout className={styles.contentLayout}>
				<Header className={styles.header}>
					<Tag
						color="processing"
						style={{ fontWeight: "bold", color: blue[5] }}
					>
						{moment().format("ddd - LL")}
					</Tag>
					<Tag
						style={{ fontWeight: "bold" }}
						className="ma-2"
						color="processing"
					>
						{config.environmentName}
					</Tag>
					{!!user && (
						<Button
							ghost
							size="small"
							type="primary"
							className="ma-2"
							icon={<LogoutOutlined />}
							onClick={() => {
								removeUser();
								dispatch(setUser(null));
							}}
						>
							Logout
						</Button>
					)}
				</Header>
				<Content className={styles.content}>{children}</Content>
			</Layout>
		</Layout>
	);
}
