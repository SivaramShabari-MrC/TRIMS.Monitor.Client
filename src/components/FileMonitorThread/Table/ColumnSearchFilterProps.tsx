import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FileMonitorModal from "./FileMonitorDetailsModal";
import { ThreadConfig } from "../../../types";

const getColumnSearchProps = ({
	dataIndex,
	searchText,
	searchInput,
	handleReset,
	handleSearch,
	setSearchText,
	searchedColumn,
	setSearchedColumn,
}: any) => ({
	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters,
	}: any) => (
		<div
			style={{
				padding: 8,
			}}
		>
			<Input
				placeholder={`Search ${dataIndex}`}
				value={selectedKeys[0]}
				onChange={(e) =>
					setSelectedKeys(e.target.value ? [e.target.value] : [])
				}
				onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
				style={{
					marginBottom: 8,
					display: "block",
				}}
			/>
			<Space>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined />}
					size="small"
					style={{
						width: 90,
					}}
				>
					Search
				</Button>
				<Button
					onClick={() => clearFilters && handleReset(clearFilters)}
					size="small"
					style={{
						width: 90,
					}}
				>
					Reset
				</Button>
				<Button
					type="link"
					size="small"
					onClick={() => {
						confirm({
							closeDropdown: false,
						});
						setSearchText(selectedKeys[0]);
						setSearchedColumn(dataIndex);
					}}
				>
					Filter
				</Button>
			</Space>
		</div>
	),
	filterIcon: (filtered: any) => (
		<SearchOutlined
			style={{
				color: filtered ? "#1890ff" : undefined,
			}}
		/>
	),
	onFilter: (value: any, record: any) =>
		record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
	onFilterDropdownOpenChange: (visible: any) => {
		if (visible) {
			setTimeout(() => searchInput.current?.select(), 100);
		}
	},
	render: (text: any, record: ThreadConfig) =>
		searchedColumn === dataIndex ? (
			<FileMonitorModal
				key={record.threadName}
				data={record}
				type="Highlight"
				searchText={searchText}
				textToHighlight={record.threadName}
			/>
		) : (
			<FileMonitorModal
				key={record.threadName}
				type="Link"
				data={record}
				searchText={record.threadName}
				textToHighlight={""}
			/>
		),
});

export default getColumnSearchProps;
