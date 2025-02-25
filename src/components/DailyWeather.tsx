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
  const windDirection = useMemo(() => {
    const degrees = weatherData.wind_deg;
    switch (true) {
      case degrees < 27:
        return "N";
      case degrees >= 27 && degrees < 135:
        return "E";
      case degrees >= 135 && degrees < 230:
        return "S";
      case degrees >= 230 && degrees < 315:
        return "W";
      default:
        return "N";
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
      <p>High: {Math.round(weatherData.temp.max)}°F</p>
      <p>Low: {Math.round(weatherData.temp.min)}°F</p>
      <p>Wind:</p>
      <p> Direction: {windDirection}</p>
      <p>
        Speed: {Math.round(weatherData.wind_speed)} mph w/ gusts up to{" "}
        {Math.round(weatherData.wind_gust)} mph
      </p>
      <p>Cloudiness: {weatherData.clouds}%</p>
      <p>UV Index: {weatherData.uvi}</p>
    </div>
  );
}
