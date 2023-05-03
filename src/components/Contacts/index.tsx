import { Col, Row, Space, Radio, Menu, Dropdown, Button } from "antd";
import { createElement, useEffect, useState } from "react";
import { useGetAllContacts, useGetContacts } from "../../api/contacts";
import ContactCard from "./ContactCard";
import Loading from "../common/Loading";
import { DownOutlined } from "@ant-design/icons";
import BankContactCard from "./BankContactCard";

function Contacts() {
	const contacts = useGetAllContacts();
	const [currentTab, setCurrentTab] = useState();
	const [emailsIds, setEmailsIds] = useState<string[]>([]);
	useEffect(() => {
		if (!currentTab && contacts.data !== null)
			setCurrentTab(contacts.data[0].teamName);
		const currentTabEmails: string[] = [];
		contacts?.data
			?.filter((c: any) => c.teamName === currentTab)
			.forEach(
				(c: any) =>
					c.type !== "bank" &&
					c.members.forEach((m: any) => currentTabEmails.push(m.email))
			);
		setEmailsIds(currentTabEmails);
	}, [contacts.data, currentTab]);
	const contactDetails = useGetContacts(emailsIds);
	const bankContacts = contacts.data?.find((c: any) => c.type === "bank");
	const [currentBank, setCurrentBank] = useState();
	useEffect(() => {
		setCurrentBank(bankContacts?.banks[0]?.bank);
	}, [bankContacts]);
	return (
		<>
			{contacts.isLoading ? (
				<Loading message={"Loading Contacts..."} />
			) : (
				<>
					<Space>
						<Radio.Group
							value={currentTab}
							onChange={(e) => setCurrentTab(e.target.value)}
						>
							{contacts.data?.map((section: any, index: any) => (
								<Radio.Button key={index} value={section.teamName}>
									{section.teamName}
								</Radio.Button>
							))}
						</Radio.Group>
					</Space>

					<>
						{contactDetails.isLoading && currentTab !== "Bank Contacts" ? (
							<div style={{ marginTop: 150 }}>
								<Loading message={`Loading ${currentTab} contacts...`} />
							</div>
						) : (
							<>
								{currentTab !== "Bank Contacts" ? (
									<Row gutter={[16, 16]} className="mt-3">
										{contactDetails.data?.data
											.sort((x: any, y: any) => (x.mail < y.mail ? 1 : -1))
											.map((data, index) => (
												<Col
													sm={{ span: 12 }}
													lg={{ span: 12 }}
													xl={{ span: 8 }}
													xxl={{ span: 6 }}
													key={index}
												>
													<ContactCard
														key={index}
														name={`${data.displayName}`}
														phone={"-- --- --- ----"}
														email={data.mail}
														workPhone={"-- --- --- ----"}
														role={data.jobTitle}
														image={""}
														contacts={
															contacts.data
																.filter((c: any) => c.teamName === currentTab)
																.map((c: any) => c.members)[0]
														}
													/>
												</Col>
											))}
									</Row>
								) : (
									<>
										<Row
											style={{ width: "100%" }}
											gutter={[16, 16]}
											className="mt-3 p-4"
										>
											<Col span={24}>
												<Space
													className="mb-2"
													align="center"
													direction="vertical"
													style={{ width: "100%" }}
												>
													<Dropdown
														overlay={
															<Menu
																onClick={(info) => {
																	setCurrentBank(info.key as any);
																}}
																items={bankContacts?.banks.map((c: any) => ({
																	label: c.bank,
																	key: c.bank,
																}))}
															/>
														}
													>
														<Button>
															<Space>
																Bank: {currentBank}
																<DownOutlined />
															</Space>
														</Button>
													</Dropdown>
												</Space>
												<BankContactCard
													bank={currentBank}
													members={
														bankContacts.banks?.find(
															(b: any) => b.bank === currentBank
														)?.members
													}
												/>
											</Col>
										</Row>
									</>
								)}
							</>
						)}
					</>
				</>
			)}
		</>
	);
}

export default Contacts;
