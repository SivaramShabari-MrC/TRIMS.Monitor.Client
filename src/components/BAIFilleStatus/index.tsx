import { DatePicker, Row, Space, Typography } from "antd";
import moment from "moment";
import { useBAIFileReport } from "../../api/BAIFileStatus";
import BAIStatusCard from "./BaiStatusCard";
import { setDate } from "../../store/BAIFileStatusSlice";
import Loading from "../common/Loading";
import { blue } from "@ant-design/colors";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "../../store";
import { GetEnvironmentName } from "../Nav/EnvironmentDropdown";
function BAIFileStatus() {
	const environment = useSelector((state) => state.global.environment);
	const date = useSelector((state) => state.BAIFileStatus.date);
	const report = useBAIFileReport();
	const dispatch = useDispatch();

	return (
		<>
			{report.isLoading ? (
				<Loading
					message={`Fetching BAI file statues in ${GetEnvironmentName(
						environment
					)} environment for ${moment(date).format("ll")}`}
				/>
			) : (
				<Space direction="vertical">
					<Space>
						<DatePicker
							defaultValue={dayjs(date)}
							onChange={(date) => {
								dispatch(setDate(date?.format("MM/DD/YYYY")));
							}}
						/>
						<Typography.Text
							style={{ fontWeight: "bold", color: blue.primary }}
						>
							{moment(date).format("ll")}
						</Typography.Text>
					</Space>
					<Row gutter={[16, 16]}>
						{report.data?.data?.length > 0 &&
							report.data?.data.map((r: any) => (
								<BAIStatusCard
									key={r.bankName}
									bankName={r.bankName}
									status={r.status}
								/>
							))}
					</Row>
				</Space>
			)}
		</>
	);
}

export default BAIFileStatus;
