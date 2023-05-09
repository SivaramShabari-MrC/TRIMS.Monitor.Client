import { green, orange, red } from "@ant-design/colors";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import { Card, Col, Space, Spin, Typography } from "antd";

function StatCard({
	text,
	number,
	pos,
	isLoading,
}: {
	text: string;
	number: number;
	pos: number;
	isLoading: boolean;
}) {
	const color = number === 0 ? green : number > 0 && number < 10 ? orange : red;
	const icon =
		number === 0 ? (
			<CheckCircleOutlined style={{ color: color[5], fontSize: 20 }} />
		) : number > 0 && number < 10 ? (
			<WarningOutlined style={{ color: color[5], fontSize: 20 }} />
		) : (
			<CloseCircleOutlined style={{ color: color[5], fontSize: 20 }} />
		);
	return (
		<Col className={`${pos === 2 ? "ml-2" : ""}`} span={6}>
			<Card
				style={{
					background: !isLoading ? color[0] : "",
					border: ` ${!isLoading ? "1px solid " + color[1] : ""}`,
					minHeight: 110,
				}}
			>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: 18,
						}}
					>
						<Spin style={{ margin: "auto" }} />
					</div>
				) : (
					<Space>
						<Typography.Title
							className="mb-2"
							style={{ color: color[5] }}
							level={1}
						>
							{number}
						</Typography.Title>
						<Typography.Text
							className="ml-2"
							style={{ color: color[5], fontWeight: "bold" }}
						>
							{text}
						</Typography.Text>
					</Space>
				)}
			</Card>
		</Col>
	);
}

export default StatCard;
