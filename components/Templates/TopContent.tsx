import React, { useState, useEffect } from "react";
import moment from "moment";
import { useGeoLocation } from "../../hooks/getLocation";
import { useWeatherApi } from "@/hooks/weatherApi";
import { WeatherDisplay } from "../Organisms/WeatherDisplay";
import { LocationTime } from "../Organisms/LocationTIme";
import useWeatherStore from "@/store/useWeatherStore";

export const TopContent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useGeoLocation();
  const { isLoading, error } = useWeatherApi();
  const { weatherData } = useWeatherStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (locationLoading || isLoading)
    return <div className="text-center p-4">Loading...</div>;
  if (locationError)
    return (
      <div className="text-center p-4 text-red-500">
        Error getting location: {locationError}
      </div>
    );
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!weatherData) return null;

  return (
    <div className="top-main grid grid-cols-1 sm:grid-cols-12 gap-10 p-2 sm:p-4">
      <div className="col-span-1 sm:col-span-5">
        <LocationTime weatherData={weatherData} />
      </div>
      <div className="col-span-1 sm:col-span-7">
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  );
};

export default TopContent;
