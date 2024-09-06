"use client";

import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface WeatherData {
  cityName?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  sunrise?: string;
  sunset?: string;
  pressure?: number;
  currentWeather?: string;
  weatherImage?: string; // Changed to `string` for SVG path
}

export interface LocationData {
  lat: number;
  lon: number;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const customIconMap: Record<string, string> = {
  "01d": "/weather-icon/clear 1.svg", // Clear sky (day)
  "01n": "/weather-icon/clear-night.svg", // Clear sky (night)
  "02d": "/weather-icon/partly-cloudy-day.svg", // Few clouds (day)
  "02n": "/weather-icon/partly-cloudy-night.svg", // Few clouds (night)
  "03d": "/weather-icon/clouds 1.svg",
  "03n": "/weather-icon/clouds.svg",
  "04d": "/weather-icon/clouds 1.svg", // Broken clouds
  "04n": "/weather-icon/broken-clouds.svg",
  "09d": "/weather-icon/shower-rain.svg", // Shower rain
  "09n": "/weather-icon/shower-rain.svg",
  "10d": "/weather-icon/rain-day.svg", // Rain (day)
  "10n": "/weather-icon/rain-night.svg", // Rain (night)
  "11d": "/weather-icon/thunderstorm.svg", // Thunderstorm
  "11n": "/weather-icon/thunderstorm.svg",
  "13d": "/weather-icon/snow.svg", // Snow
  "13n": "/weather-icon/snow.svg",
  "50d": "/weather-icon/mist.svg", // Mist
  "50n": "/weather-icon/mist.svg",
  // Add all other icon mappings...
};

const getCustomIconUrl = (openWeatherIconCode: string): string => {
  return customIconMap[openWeatherIconCode] || "/weather-icon/default.svg"; // Fallback to default icon if not found
};

export const useWeatherApi = (location: LocationData | null) => {
  const url = location
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
    : null;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const processedData: WeatherData | null = data
    ? {
        cityName: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: moment.unix(data.sys.sunrise).format("HH:mm"),
        sunset: moment.unix(data.sys.sunset).format("HH:mm"),
        pressure: data.main.pressure,
        currentWeather: data.weather[0].main,
        weatherImage: getCustomIconUrl(data.weather[0].icon),
      }
    : null;

  useEffect(() => {
    if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [error]);

  return {
    weatherData: processedData,
    isLoading: !error && !data,
    error: error ? "Failed to fetch weather data" : null,
    refetch: mutate,
  };
};
