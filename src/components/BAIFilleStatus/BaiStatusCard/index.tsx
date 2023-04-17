import { Card, Col, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import boa from "./boa.png";
import citibank from "./citibank.png";
import city_national from "./city_national.png";
import first_foundation from "./first_foundation.png";
import goldman_sachs from "./goldman_sachs.png";
import jp_morgan_chase from "./jp_morgan_chase.png";
import alliance from "./alliance.jpeg";
import wells_fargo from "./wells_fargo.png";
import { green, orange, red } from "@ant-design/colors";
import styles from "./BaiStatusCard.module.css";
function BAIStatusCard({
	bankName,
	status,
}: {
	bankName: string;
	status: string;
}) {
	let image;
	switch (bankName) {
		case "BOA":
			image = boa;
			break;
		case "CITIBANK N.A.":
			image = citibank;
			break;
		case "CITY NATIONAL BANK":
			image = city_national;
			break;
		case "1st FOUNDATION BANK":
			image = first_foundation;
			break;
		case "Goldman Sachs":
			image = goldman_sachs;
			break;
		case "JPMORGAN CHASE BANK, NA":
			image = jp_morgan_chase;
			break;
		case "ALLIANCE BANK OF ARIZONA":
			image = alliance;
			break;
		case "WELLS FARGO BANK, NA":
			image = wells_fargo;
			break;
		default:
			image = boa;
	}
	return (
		<>
			<Col span={4}>
				<Card
					className={`${styles.baiStatusCard} shadow-sm`}
					cover={
						<img
							className={`${styles.baiCardImage}`}
							alt="example"
							src={image}
						/>
					}
				>
					<Meta title={bankName} />
					<Typography.Text
						className={`${styles.baiStatusText}`}
						style={{
							color:
								status === "File Not Loaded"
									? red.primary
									: status === "File Loaded"
									? green.primary
									: orange.primary,
						}}
					>
						{status}
					</Typography.Text>
				</Card>
			</Col>
		</>
	);
}

export default BAIStatusCard;
