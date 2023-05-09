import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

type NavItemProps = {
	icon: React.ReactNode;
	route: string;
	children: React.ReactNode;
} & Record<string, unknown>;

import { Typography } from "antd";
import { blue } from "@ant-design/colors";
import { useSelector } from "../../store";

const NavItem = ({ icon, route, children }: NavItemProps) => {
	const path = useLocation();
	const doesRouteMatch =
		path.pathname.replace("/", "") === route.replace("/", "");
	const user = useSelector((s) => s.global.user);
	return (
		<>
			<Link to={route} className={styles.navItemLink}>
				<div
					style={{ color: doesRouteMatch ? blue[5] : "" }}
					className={styles.navItemContainer}
				>
					<span className={styles.navItemIcon}>{icon}</span>
					<span
						className={styles.navItemText}
						style={{
							marginTop: "5px",
							fontWeight: doesRouteMatch ? "bold" : "normal",
						}}
					>
						{children}
					</span>
					<span
						style={{
							marginLeft: "auto",
							marginRight: 15,
							width: 4,
							background: doesRouteMatch ? blue[5] : "",
						}}
					></span>
				</div>
			</Link>
		</>
	);
};
export default NavItem;
