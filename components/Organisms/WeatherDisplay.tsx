import React from "react";
import { Text } from "../Atoms/Text";
import { Icon } from "../Atoms/Icon";
import { WeatherInfo } from "../Molecules/WeatherInfo";
import { SunriseSunset } from "../Molecules/SunriseSunset";
import { WeatherData } from "@/hooks/weatherApi";

const KELVIN_TO_CELSIUS = 273.15;

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
}) => {
  const {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    sunrise,
    sunset,
    pressure,
    currentWeather,
    weatherImage,
  } = weatherData;

  const formatTemperature = (temp: number | undefined) =>
    temp !== undefined ? `${Math.round(temp)}°C` : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#444] rounded-[20px] sm:rounded-[30px] p-2 sm:p-3 w-full">
      <div className="mx-auto weather-temperature mb-2 sm:mb-3 ">
        <Text className="text-temperature text-2xl md:text-4xl lg:text-7xl">
          {formatTemperature(temperature)}
        </Text>
        <Text className="sub-text-temperature ">
          <span className="text-sm md:text-base lg:text-xl">
            Feels like: {formatTemperature(feelsLike)}
          </span>
          <span className="celc-temp text-base md:text-xl lg:text-3xl">°C</span>
        </Text>
        <div className="flex  sm:flex-col">
          <SunriseSunset title="Sunrise" time={sunrise} />
          <SunriseSunset title="Sunset" time={sunset} />
        </div>
      </div>
      <div className="weather-image">
        <div className="text-center text-xl sm:text-2xl font-semibold text-white">
          {weatherImage && (
            <Icon
              src={weatherImage}
              width={200}
              height={200}
              alt={currentWeather || "Weather icon"}
              className="mx-auto w-52 h-52 sm:w-48 sm:h-48"
            />
          )}
          <Text>{currentWeather}</Text>
        </div>
      </div>
      <div className="grid grid-cols-2  md:w-full  gap-2 sm:gap-3 text-white ">
        <WeatherInfo
          icon="/weather-icon/humidity 1.svg"
          value={`${humidity}%`}
          label="Humidity"
        />
        <WeatherInfo
          icon="/weather-icon/wind 1.svg"
          value={`${windSpeed} Km/h`}
          label="Wind Speed"
        />
        <WeatherInfo
          icon="/weather-icon/pressure-white 1.svg"
          value={`${pressure}hPa`}
          label="Pressure"
        />
      </div>
    </div>
  );
};
