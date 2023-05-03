import { Button, Card, Col, Space, Typography } from "antd";
import boa from "../../../assets/images/boa.png";
import ftb from "../../../assets/images/ftb.png";
import mt from "../../../assets/images/m&t.png";
import citibank from "../../../assets/images/citibank.png";
import city_national from "../../../assets/images/city_national.png";
import first_foundation from "../../../assets/images/first_foundation.png";
import goldman_sachs from "../../../assets/images/goldman_sachs.png";
import jp_morgan_chase from "../../../assets/images/jp_morgan_chase.png";
import alliance from "../../../assets/images/alliance.jpeg";
import wells_fargo from "../../../assets/images/wells_fargo.png";
import icon from "../../../assets/TRIMS.ico";
import { green, orange, red } from "@ant-design/colors";
import styles from "./BaiStatusCard.module.css";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "../../../store";
import moment from "moment";
function BAIStatusCard({
	bankName,
	status,
}: {
	bankName: string;
	status: string;
}) {
	const date = useSelector((s) => s.BAIFileStatus.date);
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
		case "MANUFACTURERS & TRADERS TRUST CO.":
			image = mt;
			break;
		case "FIFTH THIRD BANK":
			image = ftb;
			break;
		default:
			image = icon;
	}
	return (
		<>
			<Col span={8}>
				<div className={styles.container}>
					<div className={styles.bankContainer}>
						<img className={`${styles.baiCardImage} shawdow-sm	`} src={image} />
						<Typography.Title className={styles.baiBankName} level={5}>
							{bankName}
						</Typography.Title>
					</div>
					<div className={styles.statusContainer}>
						<Typography.Text
							style={{
								color: `${status === "File Loaded" ? green[5] : orange[5]}`,
							}}
							className={styles.baiStatusText}
						>
							{status}
						</Typography.Text>
						<Button
							disabled={status === "File Loaded"}
							onClick={() =>
								window.open(
									`mailto:sivaram.shabaria@mrcooper.com?subject=BAI file not received for ${encodeURIComponent(
										capitalize(bankName)
									)} Bank&body=Hello,${encodeURIComponent(
										"\nBAI file for " +
											capitalize(bankName) +
											" Bank not received on " +
											moment(date).format("LLL")
									)}`
								)
							}
							icon={<MailOutlined />}
							className={styles.emailBtn}
						>
							Send Email
						</Button>
					</div>
				</div>
			</Col>
		</>
	);
}

export default BAIStatusCard;
function capitalize(str: string) {
	let words = str.split(",")[0].toLowerCase().split(" ");
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
	}
	let capitalizedStr = words.join(" ");
	let finalStr = capitalizedStr.replace(/\bbank\b/gi, "");
	return finalStr;
}
