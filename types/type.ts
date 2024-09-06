// types/weatherTypes.ts

export interface LocationData {
  lat: number;
  lon: number;
}

export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  pressure: number;
}

export interface WeatherApiResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface SearchCityProps {
  onSearch: (city: string) => void;
}
