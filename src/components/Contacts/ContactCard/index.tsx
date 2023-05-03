import { Card, Image, Space, Typography } from "antd";
import {
	UserOutlined,
	PhoneOutlined,
	PhoneFilled,
	MailOutlined,
} from "@ant-design/icons";
import avatar from "./avatar.png";
import { useGetPhoto } from "../../../api/contacts";
import styles from "./ContactCard.module.css";
const { Text } = Typography;
function ContactCard({ name, role, phone, workPhone, email, contacts }: any) {
	const image = useGetPhoto(email.toLowerCase().trim());
	const contact = contacts?.find(
		(c: any) => c.email?.trim().toLowerCase() === email?.trim().toLowerCase()
	);
	return (
		<>
			<Card className={`${styles.contactCard} `}>
				<Space style={{ width: "100%" }} align="center" direction="vertical">
					<Image
						className={styles.contactImage}
						height={100}
						preview={false}
						src={
							image.data?.data
								? `data:image/png;base64, ${image.data.data}`
								: avatar
						}
					/>

					<Text className={styles.contactName}>{name}</Text>
					<Text className={styles.contactInfo}>
						<UserOutlined />
						{role || contact?.role}
					</Text>
					<Text>
						<PhoneOutlined className={styles.contactInfo} />
						{phone}
					</Text>
					<Text>
						<PhoneFilled className={styles.contactInfo} />
						{workPhone}
					</Text>
					<Text className={styles.contactEmail}>
						<MailOutlined style={{ fontSize: 18, marginRight: 4 }} />
						{email}
					</Text>
				</Space>
			</Card>
		</>
	);
}

export default ContactCard;
