import { Space, DatePicker, Row, Typography } from "antd";
import TransactionReportCard from "./TransacionReportCard";
import { FilterOutlined } from "@ant-design/icons";
import { setFrom, setTo } from "../../store/transactionReportSlice";
import { useTransactionReport } from "../../api/transactionReport";
import moment from "moment";
import { blue } from "@ant-design/colors";
import Loading from "../common/Loading";
import { useDispatch, useSelector } from "../../store";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Text } = Typography;
function TransactionReport() {
	const { from, to } = useSelector((state) => state.transactionReport);
	const transactionReport = useTransactionReport();
	const dispatch = useDispatch();
	return (
		<>
			{transactionReport.isLoading ? (
				<Loading
					message={`Loading transaction report from ${moment(from).format(
						"ll"
					)} to ${moment(to).format("ll")} ...`}
				/>
			) : (
				<>
					<Space>
						<Space
							style={{
								background: "white",
								padding: 4,
								paddingLeft: 8,
								paddingRight: 8,
								border: "1px solid #ddd",
							}}
						>
							<FilterOutlined />
						</Space>
						<RangePicker
							defaultValue={[dayjs(from), dayjs(to)]}
							onChange={(dates) => {
								dispatch(setFrom(dates?.[0]?.format("MM/DD/YYYY")));
								dispatch(setTo(dates?.[1]?.format("MM/DD/YYYY")));
							}}
						/>
						<Text style={{ fontWeight: "bold", color: blue.primary }}>
							{moment(from).format("ll")} to {moment(to).format("ll")}
						</Text>
					</Space>
					<Row gutter={[12, 12]} style={{ marginTop: 12 }}>
						<TransactionReportCard title="WIRE Transactions" type="WIRE" />
						<TransactionReportCard title="ACH Transactions" type="ACH" />
						<TransactionReportCard title="CHECK Transactions" type="CHECK" />
						<TransactionReportCard title="NEFT Transactions" type="NEFT" />
						<TransactionReportCard
							title="RECONDEP Transactions"
							type="RECONDEP"
						/>
						<TransactionReportCard
							title="RECONDISB Transactions"
							type="RECONDISB"
						/>
					</Row>
				</>
			)}
		</>
	);
}

export default TransactionReport;
