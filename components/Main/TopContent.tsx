"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useGeoLocation } from "../../utils/getLocation";
import { useWeatherApi, WeatherData } from "@/hooks/weatherApi";
import Image from "next/image";
const KELVIN_TO_CELSIUS = 273.15;

const WeatherDisplay: React.FC<{ weatherData: WeatherData }> = ({
  weatherData,
}) => {
  const {
    cityName,
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

  const convertToCelsius = (kelvin: number) =>
    (kelvin - KELVIN_TO_CELSIUS).toFixed(0);

  return (
    <div className="flex justify-between  gap-3 flex-wrap bg-[#444] rounded-[30px] p-3 w-full">
      <div className="weather-temperature mb-3 ">
        <div className="text-temperature">
          {temperature && `${convertToCelsius(temperature)}°C`}
        </div>
        <div className="sub-text-temperature">
          {feelsLike && `Feels like: ${convertToCelsius(feelsLike)}`}{" "}
          <span className="celc-temp">°C</span>
        </div>
        <div className="sunrise flex gap-2 mb-3 text-white">
          <div className="sunrise-info">
            <div className="title">Sunrise</div>
            <div className="time">{sunrise}</div>
          </div>
        </div>
        <div className="sunset flex gap-2 mb-3 text-white">
          <div className="sunset-info">
            <div className="title">Sunset</div>
            <div className="time">{sunset}</div>
          </div>
        </div>
      </div>
      <div className="weather-image col-span-12 sm:col-span-5">
        <div className="text-center text-2xl font-semibold text-white">
          {weatherImage && (
            <Image
              src={weatherImage}
              width={270}
              height={270}
              alt={currentWeather || "Weather icon"}
            />
          )}
          {currentWeather}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-white ">
        <div className="flex items-center flex-col gap-2">
          <Image
            src="/weather-icon/humidity 1.svg"
            width={60}
            height={60}
            alt="humidity"
          />
          <div className="text-center text-xl font-semibold">{humidity}%</div>
          <div className="text-center text-base font-medium">Humidity</div>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image
            src="/weather-icon/wind 1.svg"
            width={60}
            height={50}
            alt="wind"
          />
          <div className="text-center text-xl font-semibold">
            {windSpeed} Km/h
          </div>
          <div className="text-center text-base font-medium">Wind Speed</div>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image
            src="/weather-icon/pressure-white 1.svg"
            width={60}
            height={50}
            alt="pressure"
          />
          <div className="text-center text-xl font-semibold">{pressure}hPa</div>
          <div className="text-center text-base font-medium">Pressure</div>
        </div>
      </div>
    </div>
  );
};

const TopContent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useGeoLocation();
  const { weatherData, isLoading, error, refetch } = useWeatherApi(location);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (locationLoading || isLoading) return <div>Loading...</div>;
  if (locationError) return <div>Error getting location: {locationError}</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return null;
  return (
    <div className="top-main grid grid-cols-12 gap-3 ">
      <div className="col-span-12 sm:col-span-5">
        <div className="location-time bg-[#444] h-full rounded-2xl text-white flex flex-col justify-center gap-10 p-4 shadow-lg">
          <h4 className="text-center text-2xl sm:text-6xl font-bold">
            {weatherData.cityName || "Location Name"}
          </h4>
          <div className="flex flex-col items-center">
            <div className="text-center text-3xl sm:text-8xl font-bold">
              {currentTime.format("HH:mm")}
            </div>
            <h6 className="text-center text-xl">
              {currentTime.format("dddd, DD MMM")}
            </h6>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-7">
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  );
};

export default TopContent;
