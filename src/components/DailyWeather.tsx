import { DailyForecastWeatherData } from "@/types/weatherTypes";
import Image from "next/image";
import React, { useMemo } from "react";
import styles from "./DailyWeather.module.css";

interface DailyWeatherProps {
  weatherData: DailyForecastWeatherData;
}

export default function DailyWeather({ weatherData }: DailyWeatherProps) {
  const date = new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const convertedPressure = useMemo(() => {
    return Math.round(weatherData.pressure * 0.02952998057228486);
  }, [weatherData.pressure]);
  const windDirection = useMemo(() => {
    const degrees = weatherData.wind_deg;
    switch (true) {
      case degrees < 27:
        return "North";
      case degrees >= 27 && degrees < 135:
        return "East";
      case degrees >= 135 && degrees < 230:
        return "South";
      case degrees >= 230 && degrees < 315:
        return "West";
      default:
        return "North";
    }
  }, [weatherData.wind_deg]);

  return (
    <div className={styles.dailyWeather}>
      <h2 className={styles.date}>{date}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        width={50}
        height={50}
        priority
      />
      <p className={styles.description}>{weatherData.weather[0].description}</p>
      <p className={styles.data}>High: {Math.round(weatherData.temp.max)}°F</p>
      <p className={styles.data}>Low: {Math.round(weatherData.temp.min)}°F</p>
      <p className={styles.data}>
        Wind: {windDirection} {Math.round(weatherData.wind_speed)} mph
      </p>
      <p className={styles.data}>
        {" "}
        Wind Gusts: Up to {Math.round(weatherData.wind_gust)} mph
      </p>
      <p className={styles.data}>Cloudiness: {weatherData.clouds}%</p>
      <p className={styles.data}>Pressure: {convertedPressure} inHg</p>
      <p className={styles.data}>UV Index: {Math.round(weatherData.uvi)}</p>
    </div>
  );
}
