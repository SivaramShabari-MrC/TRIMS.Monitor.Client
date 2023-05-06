import { green, orange, red } from "@ant-design/colors";
import { Card, Col, Space, Typography } from "antd";

function StatCard({
	text,
	number,
	pos,
}: {
	text: string;
	number: number;
	pos: number;
}) {
	const color = number === 0 ? green : number > 0 && number < 10 ? orange : red;
	return (
		<Col className={`${pos === 2 ? "ml-2" : ""}`} span={6}>
			<Card
				style={{
					background: color[0],
					height: 100,
					border: `1px solid ${color[1]}`,
				}}
			>
				<Space>
					<Typography.Title
						className="mb-2"
						style={{ color: color[5] }}
						level={1}
					>
						{number}
					</Typography.Title>
					<Typography.Text
						className="ml-5"
						style={{ color: color[5], fontWeight: "bold" }}
					>
						{text}
					</Typography.Text>
				</Space>
			</Card>
		</Col>
	);
}

export default StatCard;
