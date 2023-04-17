import styles from "./Loading.module.css";
function Loading({ message }: { message: string }) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.text}>{message}</div>
			</div>
		</div>
	);
}

export default Loading;
