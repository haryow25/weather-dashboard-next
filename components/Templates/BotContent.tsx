import React, { useEffect, useState } from "react";
import { FiveDayForecast } from "../Organisms/FiveDayForecast";
import { HourlyForecast } from "../Organisms/HourlyForecast";
import {
  useWeatherData,
  HourlyForecast as HourlyForecastType,
} from "@/hooks/forecastApi";

export const BotContent: React.FC = () => {
  const { isLoading, error, refetch, geoLoading, geoError, weatherData } =
    useWeatherData();

  if (isLoading || geoLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error || geoError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error || geoError}
      </div>
    );
  }

  return (
    <div className="bot-main grid grid-cols-1 md:grid-cols-12 gap-10 my-3 px-2 sm:px-4">
      {weatherData && weatherData.list && (
        <div className="col-span-1 md:col-span-4">
          <FiveDayForecast forecastData={weatherData.list} />
        </div>
      )}
      {weatherData && weatherData.list && (
        <div className="col-span-1 md:col-span-8">
          <HourlyForecast hourlyData={weatherData.list.slice(0, 5)} />
        </div>
      )}
    </div>
  );
};

export default BotContent;
