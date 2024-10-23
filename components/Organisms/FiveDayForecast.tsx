import React from "react";
import { Text } from "../Atoms/Text";
import { ForecastItem } from "../Molecules/ForecastItem";

interface FiveDayForecastProps {
  forecastData: any[]; // Replace 'any' with a more specific type if available
}

export const FiveDayForecast: React.FC<FiveDayForecastProps> = ({
  forecastData,
}) => (
  <div
    className="five-day-forecast col-span-12 md:col-span-6 lg:col-span-4 bg-[#D9D9D9] dark:bg-[#444] rounded-2xl sm:rounded-[30px] p-2 sm:p-3 text-white min-h-full"
    style={{ filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.50))" }}
  >
    <Text className="five-day-forecast-title p-2 sm:p-3 flex justify-center font-bold text-xl sm:text-2xl lg:text-3xl">
      5 Days Forecast:
    </Text>
    <ul className="forecast-list">
      {forecastData
        .filter((item, index) => index % 8 === 0)
        .map((item, index) => (
          <ForecastItem
            key={index}
            date={item.dt_txt}
            icon={item.weather[0].icon}
            temperature={item.main.temp}
          />
        ))}
    </ul>
  </div>
);
