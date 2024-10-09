import React from "react";
import moment from "moment";
import { Text } from "../Atoms/Text";
import { Icon } from "../Atoms/Icon";

interface ForecastItemProps {
  date: string;
  icon: string;
  temperature: number;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({
  date,
  icon,
  temperature,
}) => (
  <li className="forecast-item grid grid-cols-12 gap-2 sm:gap-5 text-start items-center py-2">
    <div className="col-span-6 sm:col-span-6 lg:col-span-5 flex items-center gap-1 sm:gap-2 flex-wrap">
      <Icon
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt="weather icon"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10"
      />
      <Text className="forecast-weather text-lg sm:text-2xl font-semibold">
        {temperature}°C
      </Text>
    </div>
    <Text className="forecast-date text-sm sm:text-lg lg:text-xl font-semibold col-span-6 sm:col-span-6 lg:col-span-7">
      {moment(date).format("ddd, D MMM")}
    </Text>
  </li>
);
