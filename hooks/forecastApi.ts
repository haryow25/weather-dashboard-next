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
    if (data) {
      const processedData: ForecastData = {
        list: data.list.map((item: any) => ({
          dt_txt: moment(item.dt_txt).format("HH:mm"),
          main: {
            temp: item.main.temp,
            humidity: item.main.humidity,
          },
          weather: [
            {
              icon: getCustomIconUrl(item.weather[0].icon),
            },
          ],
        })),
      };
      setForecastData(processedData);
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

export const fetchHourlyForecast = async () => {
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

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (data) {
      // Process and slice the data to return only the first 4 entries
      const processedData = data.list.slice(0, 4).map(
        (item: any): HourlyForecast => ({
          dt: item.dt,
          dt_txt: moment(item.dt_txt).format("HH:mm"),
          main: {
            temp: item.main.temp,
          },
          weather: item.weather.map((weatherItem: any) => ({
            id: weatherItem.id,
            main: weatherItem.main,
            description: weatherItem.description,
            icon: getCustomIconUrl(weatherItem.icon),
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
    weatherData: data ? data.list.slice(0, 4) : null, // Return the first 4 entries of the raw data
  };
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getCustomIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
