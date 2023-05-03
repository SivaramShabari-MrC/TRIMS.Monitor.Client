import { blue } from "@ant-design/colors";
import { CopyOutlined } from "@ant-design/icons";
import { Button, List, Popover, Space } from "antd";
import getImageFromBankName from "./getImageFromBankName";

function BankContactCard({ bank, members }: any) {
	return (
		<>
			<Space align="center" direction="vertical" style={{ width: "100%" }}>
				<img
					className="shadow-sm mb-2"
					width={250}
					src={getImageFromBankName(bank)}
					alt=""
					style={{ border: "2px solid " + blue[5], borderRadius: 12 }}
				/>
			</Space>
			<List
				itemLayout="horizontal"
				dataSource={members}
				renderItem={(item: any) => (
					<List.Item
						style={{
							backgroundColor: "white",
							borderRadius: 8,
						}}
						className="my-4 pa-3 shadow-xs"
						actions={[<Button>Send Email</Button>, <Button>Edit</Button>]}
					>
						<List.Item.Meta
							avatar={
								<img
									alt=""
									height={50}
									style={{ border: "2px solid " + blue[5], borderRadius: 999 }}
									src={getImageFromBankName(bank)}
								/>
							}
							title={<b>{item.name}</b>}
							description={
								<>
									<b style={{ color: blue[5] }}>{item.email}</b>
									<Popover content={"Copy Email"} trigger="hover">
										<CopyOutlined
											style={{ color: blue[5] }}
											className="ml-2 text-lg"
											onClick={() => {
												navigator.clipboard.writeText(item.email);
											}}
										/>
									</Popover>
								</>
							}
						/>
					</List.Item>
				)}
			/>
		</>
	);
}

export default BankContactCard;
