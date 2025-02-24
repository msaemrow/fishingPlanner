import styles from "./MoonPhase.module.css";

interface MoonProps {
  moonPhase: string;
  moonEmoji: string;
  message: string;
}

export default function MoonPhase({
  moonPhase,
  moonEmoji,
  message,
}: MoonProps) {
  return (
    <div className={styles.moonPhaseContainer}>
      <p className={styles.moonInfo}>
        {moonPhase} Moon {moonEmoji}{" "}
      </p>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
