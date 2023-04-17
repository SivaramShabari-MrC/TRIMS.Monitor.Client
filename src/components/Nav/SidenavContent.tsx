import { Space, Typography } from "antd";
import { GoFileSubmodule } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai";
import { MdScheduleSend } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { GiCycle, GiServerRack } from "react-icons/gi";
import NavItem from "./NavItem";
import {
	UserOutlined,
	CalendarOutlined,
	DatabaseOutlined,
} from "@ant-design/icons";
import styles from "./Nav.module.css";
import logo from "../../assets/TRIMS.ico";
const links = [
	{
		name: "FileMonitorThreads",
		route: "/fileMonitorThreads",
		icon: <GoFileSubmodule />,
	},
	{
		name: "Transaction Report",
		route: "/transactionReport",
		icon: <TbReportMoney />,
	},
	// {
	// 	name: "Windows Services",
	// 	route: "/windows-services",
	// 	icon: <MdMiscellaneousServices />,
	// },
	{
		name: "BAI File Status",
		route: "/baiFileStatus",
		icon: <AiOutlineBank />,
	},
	// {
	// 	name: "Scheduled Jobs",
	// 	route: "/scheduled-jobs",
	// 	icon: <MdScheduleSend />,
	// },

	// {
	// 	name: "Scheduled Maintainence",
	// 	route: "/scheduled-maintainence",
	// 	icon: <DatabaseOutlined />,
	// },
	// {
	// 	name: "Calendar",
	// 	route: "/calendar",
	// 	icon: <CalendarOutlined />,
	// },
	// {
	// 	name: "Contacts",
	// 	route: "/contacts",
	// 	icon: <UserOutlined />,
	// },
	// {
	// 	name: "KEDB",
	// 	route: "/kedb",
	// 	icon: <SiBookstack />,
	// },
	// {
	// 	name: "Logs",
	// 	route: "/logs",
	// 	icon: <GiServerRack />,
	// },
	// {
	// 	name: "Health Check",
	// 	route: "/health-check",
	// 	icon: <MdHealthAndSafety />,
	// },
	// {
	// 	name: "Life Cycle",
	// 	route: "/lifecycle",
	// 	icon: <GiCycle />,
	// },
];
const SidenavContent = () => {
	return (
		<Space direction="vertical">
			<Space direction="horizontal">
				<img src={logo} height={40} alt="" />
				<Typography.Title className={`${styles.navTitle} mt-2`} level={3}>
					<span className="m-2">Trims Monitor</span>
				</Typography.Title>
			</Space>
			{links.map((link) => (
				<NavItem key={link.route} route={link.route} icon={link.icon}>
					{link.name}
				</NavItem>
			))}
		</Space>
	);
};

export default SidenavContent;
