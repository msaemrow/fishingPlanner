import { CurrentWeatherData } from "@/types/weatherTypes";
import Image from "next/image";
import React from "react";
import styles from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
  weatherData: CurrentWeatherData;
  location: string;
}

export default function CurrentWeather({
  weatherData,
  location,
}: CurrentWeatherProps) {
  return (
    <div className={styles.currentWeather}>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        width={50}
        height={50}
        priority
      />
      <p className={styles.description}>{weatherData.weather[0].description}</p>
      <p>Current Temp: {Math.round(weatherData.temp)}°F</p>
      <p>Pressure: {weatherData.pressure} hPa</p>
      <p>Wind Speed: {weatherData.wind_speed} mph</p>
      <p>Cloudiness: {weatherData.clouds}%</p>
      <p>UV Index: {weatherData.uvi}</p>
    </div>
  );
}
