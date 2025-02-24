"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { getMoonPhase } from "../utils/moonPhase";
import {
  CurrentWeatherData,
  DailyForecastWeatherData,
} from "@/types/weatherTypes";
import { MoonPhaseData, LocationData } from "@/types/dataTypes";
import DateZipCodePicker from "@/components/DateZipCodePicker";
import MoonPhase from "@/components/MoonPhase";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

export default function Home() {
  const [date, setDate] = useState<string>("");
  const [moon, setMoon] = useState<MoonPhaseData | null>();
  const [zipCode, setZipCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [locationData, setLocationData] = useState<LocationData | null>();
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherData | null>();
  const [forecastData, setForecastData] = useState<
    DailyForecastWeatherData[] | null
  >();
  const [view, setView] = useState<"current" | "forecast">("current");

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function handleZipChange(e: React.ChangeEvent<HTMLInputElement>) {
    setZipCode(e.target.value);
  }

  async function handleClick() {
    if (!date) {
      setError("Please Select a Date");
      return;
    }
    if (!zipCode) {
      setError("Please Enter a Zip Code");
      return;
    }
    if (date && zipCode) {
      const moon = getMoonPhase(date);
      setMoon(moon);
      try {
        const response = await axios.get(`/api/getLocation?zip=${zipCode}`);
        setLocationData(response.data);
        const weatherResponse = await axios.get(
          `/api/getForecast?lat=${response.data.lat}&lon=${response.data.lon}`
        );
        setCurrentWeatherData(weatherResponse.data.current);
        setForecastData(weatherResponse.data.daily);
        setError("");
      } catch (error) {
        setError("Error fetching weather data");
      }
    } else {
      setError("Date and zip not provided");
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Date picker component */}
        <DateZipCodePicker
          date={date}
          zipCode={zipCode}
          handleDateChange={handleDateChange}
          handleZipChange={handleZipChange}
          handleClick={handleClick}
          error={error}
        />
        {currentWeatherData && forecastData && (
          <div className={styles.toggleButtons}>
            <button
              className={styles.viewButton}
              onClick={() => setView("current")}
            >
              View Current Weather
            </button>
            <button
              className={styles.viewButton}
              onClick={() => setView("forecast")}
            >
              View Forecast
            </button>
          </div>
        )}

        {view === "current" && (
          <div className={styles.currentData}>
            {moon && (
              <MoonPhase
                moonPhase={moon.moonPhase}
                moonEmoji={moon.moonEmoji}
                message={moon.message}
              />
            )}
            {currentWeatherData && locationData && (
              <CurrentWeather
                weatherData={currentWeatherData}
                location={locationData.name}
              />
            )}
          </div>
        )}

        {view === "forecast" && forecastData && locationData && (
          <Forecast forecastData={forecastData} location={locationData.name} />
        )}
      </main>

      <footer className={styles.footer}>
        <p>Fishing Planner 2025</p>
      </footer>
    </div>
  );
}
