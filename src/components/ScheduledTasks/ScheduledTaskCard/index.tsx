import { blue } from "@ant-design/colors";
import {
	ClockCircleOutlined,
	FileTextOutlined,
	MonitorOutlined,
	UserOutlined,
} from "@ant-design/icons/lib/icons";
import { Card, Col, Space, Typography } from "antd";
import moment from "moment";
import styles from "./ScheduledTaskCard.module.css";
import { ScheduledTask } from "../../../types/ScheduledTask";
const { Text } = Typography;
function ScheduledTaskCard(props: ScheduledTask) {
	return (
		<>
			<Col span={6}>
				<Card
					color={blue.primary}
					title={props.taskName}
					style={{ height: "100%" }}
					className={"shadow-xs " + styles.Card}
				>
					<Space direction="vertical">
						<Text>
							<ClockCircleOutlined className="text-md mr-2" />
							<span>{moment(props.date).format("llll")}</span>
						</Text>
						<Text>
							<UserOutlined className="text-md mr-2" />
							<span>{props.author}</span>
						</Text>
						<Text>
							<MonitorOutlined className="text-md mr-2" />{" "}
							<span>{props.state} state</span>
						</Text>
						<Text>
							<FileTextOutlined className="text-md mr-2" />{" "}
							<span>{props.description || "-"}</span>
						</Text>
					</Space>
				</Card>
			</Col>
		</>
	);
}

export default ScheduledTaskCard;
