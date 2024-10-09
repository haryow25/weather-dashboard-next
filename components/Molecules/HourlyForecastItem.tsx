import React from "react";
import moment from "moment";
import { Text } from "../Atoms/Text";
import { Icon } from "../Atoms/Icon";

interface HourlyForecastItemProps {
  datetime: string;
  icon: string;
  temperature: number;
  windSpeed: number;
  windDeg: number;
}

export const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({
  datetime,
  icon,
  temperature,
  windSpeed,
  windDeg,
}) => (
  <div className="hourly-forecast-item bg-[#373636] rounded-2xl sm:rounded-[40px] flex items-center flex-col justify-center p-2 sm:p-3 gap-1 sm:gap-3">
    <Text className="text-lg sm:text-2xl">
      {moment(datetime).format("H:mm")}
    </Text>
    <Icon
      src={`https://openweathermap.org/img/w/${icon}.png`}
      alt="weather icon"
      width={60}
      height={60}
      className="w-12 h-12 sm:w-16 sm:h-16"
    />
    <Text className="text-base sm:text-xl">{temperature}°C</Text>
    <div className="text-base sm:text-xl relative flex items-center flex-col gap-1 sm:gap-2 text-center">
      <Icon
        src="/weather-icon/navigation 1.svg"
        alt="wind icon"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10"
        style={{
          transform: `rotate(${windDeg}deg)`,
          transition: "transform 0.3s",
        }}
      />
      <Text className="text-sm sm:text-base">{windSpeed} km/h</Text>
    </div>
  </div>
);
