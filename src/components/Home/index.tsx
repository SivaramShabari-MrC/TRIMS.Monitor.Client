import { Card, Col, Row, Space, Typography } from "antd";
import { useSelector } from "../../store";
import { FolderType, SystemType } from "../../types";
import { blue } from "@ant-design/colors";
import { useGetFiles } from "../../api/dashboard";
import TableCards from "./TableCards";
import StatCard from "./StatCard";
import { getTotalFileCount } from "./utils";
function Home() {
	const { user } = useSelector((s) => s.global);
	const fmsErrors = useGetFiles({
		folder: FolderType.errorsFolder,
		system: SystemType.FMS,
	});
	const bfmsErrors = useGetFiles({
		folder: FolderType.errorsFolder,
		system: SystemType.BFMS,
	});
	const fmsUnprocessed = useGetFiles({
		folder: FolderType.sourceFolder,
		system: SystemType.FMS,
	});
	const bfmsUnprocessed = useGetFiles({
		folder: FolderType.sourceFolder,
		system: SystemType.BFMS,
	});

	const cutOffTimeMins = 3000;
	const cutOffTimeMs = cutOffTimeMins * 60 * 1000;

	return (
		<div>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Card
					style={{ background: blue[0], border: "1px solid" + blue[1] }}
					bordered={false}
				>
					<Typography.Title style={{ color: blue[6] }} level={2}>
						Hello, {user}
					</Typography.Title>
					<Typography.Text style={{ color: blue[4] }}>
						Here is today's insights for TRIMS
					</Typography.Text>
				</Card>
				<Row wrap={false} className="mt-2" gutter={6} style={{ width: "100%" }}>
					<StatCard
						number={getTotalFileCount(fmsUnprocessed.data?.data) || 0}
						pos={0}
						text={"Unprocessed Files in FMS"}
					/>
					<StatCard
						number={getTotalFileCount(bfmsUnprocessed.data?.data) || 0}
						pos={1}
						text={"Unprocessed Files in BFMS"}
					/>
					<StatCard
						number={getTotalFileCount(fmsErrors.data?.data) || 0}
						pos={2}
						text={"Error Files in FMS"}
					/>
					<StatCard
						number={getTotalFileCount(bfmsErrors.data?.data) || 0}
						pos={3}
						text={"Error Files in BFMS"}
					/>
				</Row>
				<TableCards cutOffTimeMs={cutOffTimeMs} />
			</Space>
		</div>
	);
}

export default Home;
