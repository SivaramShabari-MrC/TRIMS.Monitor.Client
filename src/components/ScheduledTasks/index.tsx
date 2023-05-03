import { Row, Space } from "antd";
import { useGetScheduledTasks } from "../../api/scheduledTask";
import Loading from "../common/Loading";
import ScheduledTaskCard from "./ScheduledTaskCard";
import { useSelector } from "../../store";

function WindowsScheduledTasks() {
	const { isLoading, data } = useGetScheduledTasks();
	const environment = useSelector((state) => state.global.environment);
	return (
		<>
			{isLoading ? (
				<Loading
					message={`Fetching Scheduled Tasks in ${environment} environment...`}
				/>
			) : (
				<Space>
					<Row gutter={[16, 16]}>
						{data?.data?.map((d, index: number) => (
							<ScheduledTaskCard key={index} {...d} />
						))}
					</Row>
				</Space>
			)}
		</>
	);
}

export default WindowsScheduledTasks;
