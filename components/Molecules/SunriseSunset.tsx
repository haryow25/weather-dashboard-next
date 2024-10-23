import React from "react";
import { Text } from "../Atoms/Text";
import Image from "next/image";
interface SunriseSunsetProps {
  title: string;
  time: string;
  sunriseSunsetSrc: string;
}

export const SunriseSunset: React.FC<SunriseSunsetProps> = ({
  title,
  time,
  sunriseSunsetSrc,
}) => (
  <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 text-white">
    <div className={`${title.toLowerCase()}-info flex items-center gap-4 `}>
      <Image
        src={sunriseSunsetSrc}
        alt="sunrise/sunset icon"
        width={48}
        height={48}
      />
      <div className="flex flex-col gap-1">
        <Text className="title text-sm md:text-base lg:text-xl font-semibold">
          {title}
        </Text>
        <Text className="time text-sm lg:text-base font-semibold">{time}</Text>
      </div>
    </div>
  </div>
);
