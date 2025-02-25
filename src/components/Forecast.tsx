import { DailyForecastWeatherData } from "@/types/weatherTypes";
import DailyWeather from "./DailyWeather";
import styles from "./Forecast.module.css";

interface ForecastProps {
  forecastData: DailyForecastWeatherData[];
  location: string;
}
export default function Forecast({ forecastData, location }: ForecastProps) {
  return (
    <div className={styles.forecast}>
      <h2 className={styles.title}>{location} 3-Day Forecast</h2>
      <div className={styles.forecastGrid}>
        {forecastData.slice(0, 3).map((day, index) => (
          <DailyWeather key={index} weatherData={day} />
        ))}
      </div>
    </div>
  );
}
