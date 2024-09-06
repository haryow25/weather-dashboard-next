// api.ts
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface WeatherData {
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

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  const response = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  return response.data;
};

export const fetchHourlyForecast = async (
  latitude: number,
  longitude: number
) => {
  const response = await axios.get<{ list: HourlyForecast[] }>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  return response.data.list.slice(0, 4);
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
