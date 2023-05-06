import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "../../../store";
import { setSearch } from "../../../store/fileMonitorThreadSlice";

function SearchDropdown() {
	const [search, setSearchText] = useState("");
	const dispatch = useDispatch();
	return (
		<Dropdown
			menu={{
				items: [
					{
						label: (
							<Space
								style={{ margin: 0, padding: 0 }}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
							>
								<Input
									style={{ margin: -4, padding: 4 }}
									value={search}
									onChange={(e) => setSearchText(e.target.value || "")}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									size="small"
								/>
								<Button
									icon={<SearchOutlined />}
									type="primary"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										dispatch(setSearch(search));
									}}
								/>
								<Button
									icon={<ReloadOutlined />}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSearchText("");
										dispatch(setSearch(""));
									}}
								/>
							</Space>
						),
						key: 0,
					},
				],
			}}
			trigger={["click"]}
		>
			<Button
				icon={<SearchOutlined style={{ fontSize: "small" }} />}
				type="ghost"
			/>
		</Dropdown>
	);
}

export default SearchDropdown;
