import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

type NavItemProps = {
	icon: React.ReactNode;
	route: string;
	children: React.ReactNode;
} & Record<string, unknown>;

import { Typography } from "antd";
import { blue } from "@ant-design/colors";

const NavItem = ({ icon, route, children }: NavItemProps) => {
	const path = useLocation();
	const doesRouteMatch =
		path.pathname.replace("/", "") === route.replace("/", "");
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
