export interface CurrentWeatherData {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  wind_deg: number;
  wind_speed: number;
  wind_gust: number;

  weather: WeatherCondition[];
}

export interface WeatherCondition {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface DailyForecastWeatherData {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: feelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: 0;
  pressure: number;
  summary: string;
  sunrise: number;
  sunset: number;
  temp: temperature;
  uvi: number;
  visibility: number;
  wind_deg: number;
  wind_speed: number;
  wind_gust: number;
  weather: WeatherCondition[];
}

export interface temperature {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface feelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}
