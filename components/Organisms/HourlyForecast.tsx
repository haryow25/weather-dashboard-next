import React from "react";
import { Text } from "../Atoms/Text";
import { HourlyForecastItem } from "../Molecules/HourlyForecastItem";

interface HourlyForecastProps {
  hourlyData: any[]; // Replace 'any' with a more specific type if available
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyData,
}) => (
  <div
    className="hourly-forecast col-span-12 md:col-span-6 lg:col-span-8 bg-[#444] rounded-[30px] p-5 min-h-full"
    style={{ boxShadow: "10px 10px 4px 0px rgba(0, 0, 0, 0.50)" }}
  >
    <Text className="flex items-center justify-center text-3xl text-white font-bold">
      Hourly Forecast:
    </Text>
    <div className="list-hourly-forecast flex flex-wrap justify-center gap-3 my-3 text-white font-bold">
      {hourlyData.map((hour, index) => (
        <HourlyForecastItem
          key={index}
          datetime={hour.dt_txt}
          icon={hour.weather[0].icon}
          temperature={hour.main.temp}
          windSpeed={hour.wind.speed}
          windDeg={hour.wind.deg}
        />
      ))}
    </div>
  </div>
);
