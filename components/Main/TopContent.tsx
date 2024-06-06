"use client";
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const KELVIN_TO_CELSIUS = 273.15;

interface WeatherData {
  cityName?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  sunrise?: string;
  sunset?: string;
  pressure?: number;
}

interface ChildProps {
  value: string;
  handleChange: (value: string) => void;
}

interface LocationData {
  lat: number;
  lon: number;
}

// Custom hook to fetch weather data
const useWeatherData = (location: LocationData | null) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);
        const { data } = response;

        if (data.main && data.name && data.sys && data.wind) {
          setWeatherData({
            cityName: data.name,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            sunrise: moment.unix(data.sys.sunrise).format("HH:mm"),
            sunset: moment.unix(data.sys.sunset).format("HH:mm"),
            pressure: data.main.pressure,
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  return weatherData;
};

const TopContent: FC<ChildProps> = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [location, setLocation] = useState<LocationData | null>(null);
  const weatherData = useWeatherData(location);

  // Gets user's location using geolocation
  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getLocation();
  }, []);

  // Updates time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { cityName, temperature, feelsLike, humidity, windSpeed, sunrise, sunset, pressure } = weatherData;

  const convertToCelsius = (kelvin) => (kelvin - KELVIN_TO_CELSIUS).toFixed(0);
  return (
    <div className="top-main  grid grid-cols-1 sm:grid-cols-12 gap-3 justify-center">
      <div className="col-span-1 sm:col-span-5">
        <div className="location-time bg-[#444] h-full rounded-2xl text-white flex flex-col justify-center gap-10 p-4 shadow-lg">
          <h4 className="text-center text-2xl sm:text-6xl font-bold">{cityName || "Location Name"}</h4>
          <div className="flex flex-col items-center">
            <div className="text-center text-3xl sm:text-8xl font-bold">{currentTime.format("HH:mm")}</div>
            <h6 className="text-center text-xl">{currentTime.format("dddd, DD MMM")}</h6>
          </div>
        </div>
      </div>
      <div className="col-span-1 sm:col-span-7">
        <div className="grid grid-cols-12 bg-[#444] rounded-[30px] p-3">
          <div className="weather-temperature mb-3 col-span-12 sm:col-span-4">
            <div className="text-temperature">{temperature && `${convertToCelsius(temperature)}°C`}</div>
            <div className="sub-text-temperature">
              {feelsLike && `Feels like: ${convertToCelsius(feelsLike)}`} <span className="celc-temp">°C</span>
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
          <div className="weather-image col-span-12 sm:col-span-4">
            <div className="text-center text-2xl font-semibold text-white">Weather Condition</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-white col-span-12 sm:col-span-4">
            <div className="flex items-center flex-col gap-2">
              <div className="text-center text-xl font-semibold">{humidity}%</div>
              <div className="text-center text-base font-medium">Humidity</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <div className="text-center text-xl font-semibold">{windSpeed} Km/h</div>
              <div className="text-center text-base font-medium">Wind Speed</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <div className="text-center text-xl font-semibold">{pressure}hPa</div>
              <div className="text-center text-base font-medium">Pressure</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <div className="text-center text-xl font-semibold">UV Index</div>
              <div className="text-center text-base font-medium">UV Index</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContent;
