import styles from "./SmallDateZipCodePicker.module.css";
import ErrorMessage from "./ErrorMessage";

interface DateZipCodePickerProps {
  date: string;
  zipCode: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  error: string;
}

export default function DateZipCodePicker({
  date,
  zipCode,
  handleDateChange,
  handleZipChange,
  handleClick,
  error,
}: DateZipCodePickerProps) {
  return (
    <div className={styles.mainContent}>
      <div className={styles.dateZipCodePicker}>
        <h1 className={styles.title}>Fishing Planner</h1>

        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
        <input
          type="text"
          value={zipCode}
          onChange={handleZipChange}
          className={styles.zipInput}
          placeholder="Enter Zip Code"
        />
        <button onClick={handleClick} className={styles.button}>
          Plan Fishing Trip
        </button>
      </div>

      <ErrorMessage message={error} />
    </div>
  );
}
