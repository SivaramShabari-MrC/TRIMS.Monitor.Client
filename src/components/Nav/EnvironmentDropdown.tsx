import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { setEnvironment, useDispatch, useSelector } from "../../store";
import { EnvironmentType } from "../../types";

export const EnvironmentDropDown = () => {
	const system = useSelector((state) => state.global.environment);
	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				onClick: (info) => {
					dispatch(setEnvironment(parseInt(info.key)));
				},
				items: [
					{
						label: "Development",
						key: EnvironmentType.Development,
					},
					{
						label: "QA",
						key: EnvironmentType.QA,
					},
					{
						label: "UAT",
						key: EnvironmentType.UAT,
					},
					{
						label: "Production",
						key: EnvironmentType.Production,
						// disabled: true,
					},
				],
			}}
		>
			<Button>
				<Space>
					Environment: {GetEnvironmentName(system)}
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export const GetEnvironmentName = (type: EnvironmentType) => {
	switch (type) {
		case 0:
			return "Development";
		case 1:
			return "QA";
		case 2:
			return "UAT";
		case 3:
			return "Production";
		default:
			return "Development";
	}
};
