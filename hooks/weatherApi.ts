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

const getCustomIconUrl = (weatherId: number): string => {
  const customIconMap: Record<number, string> = {
    800: "/weather-icon/clear-1.svg", // Clear sky
    801: "/weather-icon/clouds-1.svg", // Few clouds
    802: "/weather-icon/clouds-1.svg", // Scattered clouds
    803: "/weather-icon/clouds-1.svg", // Broken clouds
    804: "/weather-icon/broken-clouds.svg", // Overcast clouds
    520: "/weather-icon/shower-rain.svg", // Shower rain
    500: "/weather-icon/rain-1.svg", // Rain
    501: "/weather-icon/rain-1.svg", // Rain
    200: "/weather-icon/thunderstorm.svg", // Thunderstorm
    600: "/weather-icon/snow.svg", // Snow
    701: "/weather-icon/mist-1.svg", // Mist
    721: "/weather-icon/mist-1.svg", // Mist
    // Add more mappings as needed
  };

  // Return the custom icon URL, or a default icon if the ID is not in the map

  return customIconMap[weatherId] || "/weather-icon/default.svg";
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
      const timezoneOffset = data.timezone; // Time zone offset in seconds
      const convertToLocalTime = (unixTimestamp: number) => {
        // Create a new Date object using the Unix timestamp
        const utcTime = moment.unix(unixTimestamp);
        // Adjust the time using the time zone offset
        return utcTime.utcOffset(timezoneOffset / 60).format("HH:mm");
      };

      const processedData: WeatherData = {
        cityName: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: convertToLocalTime(data.sys.sunrise), // Adjust sunrise to local time
        sunset: convertToLocalTime(data.sys.sunset), // Adjust sunset to local time,
        pressure: data.main.pressure,
        currentWeather: data.weather[0].main,
        weatherImage: getCustomIconUrl(data.weather[0].id),
      };
      console.log(processedData);
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
