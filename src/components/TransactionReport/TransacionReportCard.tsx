import { blue, cyan, green, orange, red, yellow } from "@ant-design/colors";
import { Card, Col, Empty, Space } from "antd";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { useTransactionReport } from "../../api/transactionReport";
import styles from "./TransactionReportCard.module.css";
const TransactionReportCard = ({
	title,
	type,
}: {
	title: string;
	type: string;
}) => {
	const transactionReport = useTransactionReport();
	const data = transactionReport?.data?.data
		?.filter((i) => i.type === type)
		?.map((i) => ({ ...i, count: parseInt(i.count) }))
		?.sort((a, b) => b.count - a.count)
		?.slice(0, 6);
	const COLORS = [blue[4], red[3], orange[4], green[4], yellow[5], cyan[4]];
	const COLORS_LEGEND = [
		blue[5],
		red[4],
		orange[5],
		green[5],
		yellow[6],
		cyan[5],
	];
	return (
		<Col
			className={styles.col}
			sm={{ span: 24 }}
			md={{ span: 12 }}
			lg={{ span: 12 }}
			xl={{ span: 8 }}
			xxl={{ span: 6 }}
		>
			<Card
				className={`${styles.card} shadow-sm`}
				title={title}
				bordered={false}
			>
				{data?.length === 0 ? (
					<div className={styles.empty}>
						<Empty />
					</div>
				) : (
					<Space className={styles.container}>
						<PieChart className={styles.pieChart} width={270} height={350}>
							<Legend
								iconSize={10}
								align="center"
								layout="vertical"
								verticalAlign="bottom"
								fontWeight="bold"
								payload={
									data?.map((item, index) => ({
										id: item.type,
										type: "square",
										value: `${item.status} - ${item.count}`,
										color: COLORS_LEGEND[index],
									})) as any
								}
								formatter={(value) => (
									<span className={styles.legend}>{value}</span>
								)}
							/>
							<Pie
								cx={128}
								cy={100}
								data={data}
								innerRadius={70}
								outerRadius={85}
								fill={blue.primary}
								paddingAngle={2}
								dataKey="count"
							>
								{data?.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index]} />
								))}
							</Pie>
						</PieChart>
					</Space>
				)}
			</Card>
		</Col>
	);
};

export default TransactionReportCard;
