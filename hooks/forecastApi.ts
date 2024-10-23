import { useEffect } from "react";
import useWeatherStore from "@/store/useWeatherStore";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import { useGeoLocation } from "@/hooks/getLocation";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface ForecastData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

export interface HourlyForecast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
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

export const useWeatherData = () => {
  const { searchLocation, setForecastData, setCurrentLocation } =
    useWeatherStore();
  const { location, loading: geoLoading, error: geoError } = useGeoLocation();

  useEffect(() => {
    if (location && !searchLocation) {
      setCurrentLocation(location);
    }
  }, [location, searchLocation, setCurrentLocation]);

  const activeLocation = searchLocation || location;

  const url = activeLocation
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${activeLocation.lat}&lon=${activeLocation.lon}&appid=${API_KEY}&units=metric`
    : null;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (data && Array.isArray(data.list)) {
      const processedDataHourly: HourlyForecast[] = data.list.map(item => ({
        dt: item.dt_txt,
        dt_txt: moment(item.dt_txt).format("HH:mm"),
        main: {
          temp: item.main.temp,
        },
        weather: [
          {
            id: item.weather[0]?.id || 0,
            main: item.weather[0]?.main || "",
            description: item.weather[0]?.description || "",
            icon: getCustomIconUrl(item.weather[0]?.icon || ""),
          },
        ],
        wind: {
          speed: item.wind?.speed || 0,
        },
      }));
      setForecastData(processedDataHourly);
    }
  }, [data, setForecastData]);
  useEffect(() => {
    if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [error]);

  return {
    isLoading: !error && !data,
    error: error ? "Failed to fetch weather data" : null,
    refetch: mutate,
    geoLoading,
    geoError,
    weatherData: data,
  };
};

export const useFetchHourlyForecast = async () => {
  const { searchLocation, setHourlyForecast, setCurrentLocation } =
    useWeatherStore();
  const { location, loading: geoLoading, error: geoError } = useGeoLocation();

  useEffect(() => {
    if (location && !searchLocation) {
      setCurrentLocation(location);
    }
  }, [location, searchLocation, setCurrentLocation]);

  const activeLocation = searchLocation || location;

  const url = activeLocation
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${activeLocation.lat}&lon=${activeLocation.lon}&appid=${API_KEY}&units=metric`
    : null;

  const { data, error, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (data) {
      // Process and slice the data to return only the first 4 entries
      const processedData = data.list.slice(0, 5).map(
        (item: any): ForecastData => ({
          dt: item.dt,
          dt_txt: moment(item.dt_txt).format("HH:mm"),
          main: {
            temp: item.main.temp,
          },
          weather: item.weather.map((weatherItem: any) => ({
            id: weatherItem.id,
            main: weatherItem.main,
            description: weatherItem.description,
            icon: getCustomIconUrl(data.weather[0].id),
          })),
          wind: {
            speed: item.wind.speed,
          },
        })
      );
      setHourlyForecast(processedData);
    }
  }, [data, setHourlyForecast]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [error]);

  return {
    isLoading: !error && !data,
    error: error ? "Failed to fetch weather data" : null,
    refetch: mutate,
    geoLoading,
    geoError,
    weatherData: data ? data.list.slice(0, 5) : null, // Return the first 4 entries of the raw data
  };
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
