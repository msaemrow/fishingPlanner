import styles from "./DateZipCodePicker.module.css";
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
      <h1 className={styles.title}>Fishing Planner</h1>

      <div className={styles.controls}>
        <input
          type="text"
          value={date}
          onChange={handleDateChange}
          className={styles.dateInput}
          placeholder="Select Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <input
          type="text"
          value={zipCode}
          onChange={handleZipChange}
          className={styles.dateInput}
          placeholder="Enter Zip Code"
        />
      </div>
      <button onClick={handleClick} className={styles.button}>
        Plan Fishing Trip
      </button>
      <ErrorMessage message={error} />
    </div>
  );
}
