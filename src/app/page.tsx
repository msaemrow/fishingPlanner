"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { getMoonPhase } from "../utils/moonPhase";
import {
  CurrentWeatherData,
  DailyForecastWeatherData,
} from "@/types/weatherTypes";
import { MoonPhaseData, LocationData } from "@/types/dataTypes";
import DateZipCodePicker from "@/components/DateZipCodePicker";
import SmallDateZipCodePicker from "@/components/SmallDateZipCodePicker";
import MoonPhase from "@/components/MoonPhase";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

export default function Home() {
  const [theme, setTheme] = useState<string>("light");
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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

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
      <main
        className={
          currentWeatherData && forecastData
            ? styles.containerWithData
            : styles.container
        }
      >
        {currentWeatherData && forecastData ? (
          <SmallDateZipCodePicker
            date={date}
            zipCode={zipCode}
            handleDateChange={handleDateChange}
            handleZipChange={handleZipChange}
            handleClick={handleClick}
            error={error}
          />
        ) : (
          <DateZipCodePicker
            date={date}
            zipCode={zipCode}
            handleDateChange={handleDateChange}
            handleZipChange={handleZipChange}
            handleClick={handleClick}
            error={error}
          />
        )}

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

        {view === "current" && currentWeatherData && locationData && (
          <div className={styles.currentData}>
            <h2 className={styles.currentWeatherTitle}>
              Current Conditions for {locationData.name}
            </h2>
            <div className={styles.currentDataCards}>
              {currentWeatherData && locationData && (
                <CurrentWeather
                  weatherData={currentWeatherData}
                  location={locationData.name}
                />
              )}
              {moon && (
                <MoonPhase
                  moonPhase={moon.moonPhase}
                  moonEmoji={moon.moonEmoji}
                  message={moon.message}
                />
              )}
            </div>
          </div>
        )}

        {view === "forecast" && forecastData && locationData && (
          <Forecast forecastData={forecastData} location={locationData.name} />
        )}
      </main>

      <footer className={styles.footer}>
        <p>Fishing Planner 2025</p>
        <button className={styles.themeButton} onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </footer>
    </div>
  );
}
