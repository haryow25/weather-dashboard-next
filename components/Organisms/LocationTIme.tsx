import React from "react";
import { Text } from "../Atoms/Text";
import moment from "moment";
import { WeatherData } from "@/hooks/weatherApi";
import useWeatherStore from "@/store/useWeatherStore";

interface LocationTimeProps {
  weatherData: WeatherData;
}

export const LocationTime: React.FC<LocationTimeProps> = ({ weatherData }) => {
  const cityName = weatherData?.cityName;
  const { currentTime } = useWeatherStore();
  return (
    <div className="location-time bg-[#444] h-full rounded-xl sm:rounded-2xl text-white flex flex-col justify-center gap-4 sm:gap-10 p-3 sm:p-4 shadow-lg">
      <Text className="text-center text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
        {cityName || "Location Name"}
      </Text>
      <div className="flex flex-col items-center">
        <Text className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">
          {currentTime.format("HH:mm")}
        </Text>
        <Text className="text-center text-base sm:text-lg md:text-xl">
          {currentTime.format("dddd, DD MMM")}
        </Text>
      </div>
    </div>
  );
};
