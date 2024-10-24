import create from "zustand";
import moment from "moment";
import { WeatherData, LocationData } from "@/hooks/weatherApi";
import { ForecastData } from "@/hooks/forecastApi"; // Assuming ForecastData is already defined in the hooks

interface WeatherState {
  cityName: string;
  currentTime: moment.Moment;
  currentLocation: LocationData | null;
  searchLocation: LocationData | null;
  weatherData: WeatherData | null;
  forecastData: ForecastData | null; // Added forecastData to the state interface
  hourlyForecast: HourlyForecast | null; // Added hourlyForecast to the state interface
  setCityName: (name: string) => void;
  setCurrentTime: (time: moment.Moment) => void;
  setCurrentLocation: (location: LocationData | null) => void;
  setSearchLocation: (location: LocationData | null) => void;
  setWeatherData: (data: WeatherData | null) => void;
  setForecastData: (data: ForecastData | null) => void;
  setHourlyForecast: (data: HourlyForecast | null) => void;
}

interface HourlyForecast {
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

const useWeatherStore = create<WeatherState>(set => ({
  cityName: "",
  currentTime: moment(),
  currentLocation: null,
  searchLocation: null,
  weatherData: null,
  forecastData: null, // Initialize forecastData
  hourlyForecast: null, // Initialize hourlyForecast
  setCityName: (name: string) => set({ cityName: name }),
  setCurrentTime: (time: moment.Moment) => set({ currentTime: time }),
  setCurrentLocation: (location: LocationData | null) =>
    set({ currentLocation: location }),
  setSearchLocation: (location: LocationData | null) =>
    set({ searchLocation: location }),
  setWeatherData: (data: WeatherData | null) => set({ weatherData: data }),
  setForecastData: (data: ForecastData | null) => set({ forecastData: data }),
  setHourlyForecast: (data: HourlyForecast | null) =>
    set({ hourlyForecast: data }),
}));

export default useWeatherStore;
