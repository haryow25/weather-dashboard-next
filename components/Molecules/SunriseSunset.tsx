import React from "react";
import { Text } from "../Atoms/Text";

interface SunriseSunsetProps {
  title: string;
  time: string;
}

export const SunriseSunset: React.FC<SunriseSunsetProps> = ({
  title,
  time,
}) => (
  <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 text-white">
    <div className={`${title.toLowerCase()}-info`}>
      <Text className="title text-sm md:text-base lg:text-xl font-semibold">
        {title}
      </Text>
      <Text className="time text-sm lg:text-base font-semibold">{time}</Text>
    </div>
  </div>
);
