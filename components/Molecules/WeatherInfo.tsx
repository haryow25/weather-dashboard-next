import React from "react";
import { Text } from "../Atoms/Text";
import { Icon } from "../Atoms/Icon";

interface WeatherInfoProps {
  icon: string;
  value: string;
  label: string;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({
  icon,
  value,
  label,
}) => (
  <div className="flex items-center flex-col gap-1 sm:gap-2">
    <Icon
      src={icon}
      width={40}
      height={40}
      alt={label}
      className="w-8 h-8 sm:w-12 sm:h-12"
    />
    <Text className="text-center text-base sm:text-xl font-semibold">
      {value}
    </Text>
    <Text className="text-center text-xs sm:text-base font-medium">
      {label}
    </Text>
  </div>
);
