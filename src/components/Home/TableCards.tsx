import { Card, Col, Row, Table, Typography } from "antd";
import { FolderType, SystemType } from "../../types";
import { CardTableProps, getErrorFiles, getUnprocessedFiles } from "./utils";
import { useGetFiles } from "../../api/dashboard";

function TableCards({ cutOffTimeMs }: { cutOffTimeMs: number }) {
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
	const fmsUnprocessedData = getUnprocessedFiles(
		fmsUnprocessed.data?.data,
		cutOffTimeMs
	);
	const bfmsUnprocessedData = getUnprocessedFiles(
		bfmsUnprocessed.data?.data,
		cutOffTimeMs
	);
	const fmmErr = getErrorFiles(fmsErrors.data?.data);
	const bfmmErr = getErrorFiles(bfmsErrors.data?.data);
	return (
		<>
			<div>
				<Row className="mt-2" gutter={18}>
					<Col span={12} style={{ height: "max-content" }}>
						<Card title="Unprocessed files < 30 minutes" bordered={false}>
							<Row>
								<Col span={12}>
									<Typography.Title level={5}>FMS</Typography.Title>
									<Table
										loading={fmsUnprocessed.isLoading}
										{...CardTableProps}
										dataSource={fmsUnprocessedData}
									/>
								</Col>
								<Col span={12}>
									<Typography.Title level={5}>BFMS</Typography.Title>
									<Table
										loading={bfmsUnprocessed.isLoading}
										{...CardTableProps}
										dataSource={bfmsUnprocessedData}
									/>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="Files in Error Folder" bordered={false}>
							<Row>
								<Col span={12}>
									<Typography.Title level={5}>FMS</Typography.Title>
									<Table
										loading={fmsErrors.isLoading}
										{...CardTableProps}
										dataSource={fmmErr}
									/>
								</Col>
								<Col span={12}>
									<Typography.Title level={5}>BFMS</Typography.Title>
									<Table
										loading={bfmsErrors.isLoading}
										{...CardTableProps}
										dataSource={bfmmErr}
									/>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default TableCards;
