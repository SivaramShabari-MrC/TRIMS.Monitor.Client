import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

type NavItemProps = {
	icon: React.ReactNode;
	route: string;
	children: React.ReactNode;
} & Record<string, unknown>;

import { Typography } from "antd";

const NavItem = ({ icon, route, children }: NavItemProps) => {
	const path = useLocation();
	const doesRouteMatch =
		path.pathname.replace("/", "") === route.replace("/", "");
	return (
		<>
			<Link to={route} className={styles.navItemLink}>
				<div className={styles.navItemContainer}>
					<span className={styles.navItemIcon}>{icon}</span>{" "}
					<span
						className={styles.navItemText}
						style={{
							fontWeight: doesRouteMatch ? "bold" : "normal",
						}}
					>
						{children}
					</span>
				</div>
			</Link>
		</>
	);
};
export default NavItem;
