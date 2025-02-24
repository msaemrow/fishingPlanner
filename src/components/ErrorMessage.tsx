import styles from "./ErrorMessage.module.css";

interface ErrorProps {
  message: string;
}
export default function ErrorMessage({ message }: ErrorProps) {
  return <p className={styles.error}>{message}</p>;
}
