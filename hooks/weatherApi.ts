import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import useWeatherStore from "@/store/useWeatherStore";
import { useGeoLocation } from "@/hooks/getLocation";

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
  weatherImage?: string;
}

export interface LocationData {
  lat: number;
  lon: number;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const customIconMap: Record<string, string> = {
  "01d": "/weather-icon/clear 1.svg",
  "01n": "/weather-icon/clear-night.svg",
  "02d": "/weather-icon/partly-cloudy-day.svg",
  "02n": "/weather-icon/partly-cloudy-night.svg",
  "03d": "/weather-icon/clouds 1.svg",
  "03n": "/weather-icon/clouds.svg",
  "04d": "/weather-icon/clouds 1.svg",
  "04n": "/weather-icon/broken-clouds.svg",
  "09d": "/weather-icon/shower-rain.svg",
  "09n": "/weather-icon/shower-rain.svg",
  "10d": "/weather-icon/rain-day.svg",
  "10n": "/weather-icon/rain-night.svg",
  "11d": "/weather-icon/thunderstorm.svg",
  "11n": "/weather-icon/thunderstorm.svg",
  "13d": "/weather-icon/snow.svg",
  "13n": "/weather-icon/snow.svg",
  "50d": "/weather-icon/mist.svg",
  "50n": "/weather-icon/mist.svg",
};

const getCustomIconUrl = (openWeatherIconCode: string): string => {
  return customIconMap[openWeatherIconCode] || "/weather-icon/default.svg";
};

export const useWeatherApi = () => {
  const { searchLocation, setWeatherData, setCurrentLocation } =
    useWeatherStore();
  const { location, loading: geoLoading, error: geoError } = useGeoLocation();

  useEffect(() => {
    if (location && !searchLocation) {
      setCurrentLocation(location);
    }
  }, [location, searchLocation, setCurrentLocation]);
  const activeLocation = searchLocation || location;

  const url = activeLocation
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${activeLocation.lat}&lon=${activeLocation.lon}&appid=${API_KEY}&units=metric`
    : null;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (data) {
      const processedData: WeatherData = {
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
      };
      setWeatherData(processedData);
    }
  }, [data, setWeatherData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [error]);

  return {
    isLoading: !error && !data,
    error: error ? "Failed to fetch weather data" : null,
    refetch: mutate,
  };
};
