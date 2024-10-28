import React from "react";
import moment from "moment";
import { Text } from "../Atoms/Text";
import { Icon } from "../Atoms/Icon";

interface ForecastItemProps {
  date: string;
  icon: string;
  temperature: number;
  alt: string;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({
  date,
  icon,
  temperature,
  alt,
}) => (
  <li className="forecast-item grid grid-cols-12 gap-2 sm:gap-5 text-start items-center py-2">
    <div className="col-span-6">
      <div className="flex gap-3 items-center">
        <div className="relative h-12 w-12 ">
          <Icon
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={alt}
            width={40}
            height={40}
            className="absolute w-full h-full"
          />
        </div>

        <Text className="forecast-weather text-lg sm:text-2xl font-semibold">
          {temperature}°C
        </Text>
      </div>
    </div>
    <div className="col-span-6">
      <Text className="forecast-date text-sm sm:text-lg lg:text-xl font-semibold  ">
        {moment(date).format("ddd, D MMM")}
      </Text>
    </div>
  </li>
);
