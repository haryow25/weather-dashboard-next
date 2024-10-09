import create from "zustand";
import { WeatherData, LocationData } from "@/hooks/weatherApi";
import moment from "moment";

interface WeatherState {
  cityName: string;
  currentTime: moment.Moment;
  searchLocation: LocationData | null;
  weatherData: WeatherData | null;
  setCityName: (name: string) => void;
  setCurrentTime: (time: moment.Moment) => void;
  setSearchLocation: (location: LocationData | null) => void;
  setWeatherData: (data: WeatherData | null) => void;
}

const useWeatherStore = create<WeatherState>(set => ({
  cityName: "",
  currentTime: moment(),
  searchLocation: null,
  weatherData: null,
  setCityName: (name: string) => set({ cityName: name }),
  setCurrentTime: (time: moment.Moment) => set({ currentTime: time }),
  setSearchLocation: (location: LocationData | null) =>
    set({ searchLocation: location }),
  setWeatherData: (data: WeatherData | null) => set({ weatherData: data }),
}));

export default useWeatherStore;
