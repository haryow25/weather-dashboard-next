"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function TopContent() {
  const [currentTime, setCurrentTime] = useState(moment());
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  // Fetches weather data based on location
  const fetchWeatherData = async () => {
    try {
      if (location) {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);
        const { data } = response;

        console.table(data);

        if (data.main && data.name && data.sys && data.wind) {
          const formattedSunrise = moment.unix(data.sys.sunrise).format("HH:mm");
          const formattedSunset = moment.unix(data.sys.sunset).format("HH:mm");

          setWeatherData({
            cityName: data.name,
            temperature: data.main.temp - 273.15,
            feelsLike: data.main.feels_like - 273.15,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            sunrise: formattedSunrise,
            sunset: formattedSunset,
            pressure: data.main.pressure,
          });
        } else {
          console.error("Error fetching weather data: Incomplete response data");
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Gets user's location using geolocation
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Updates time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetches weather data on component mount and location change
  useEffect(() => {
    getLocation();
    fetchWeatherData();
  }, [location]);

  const { cityName, temperature, feelsLike, humidity, windSpeed, sunrise, sunset, pressure } = weatherData;
  return (
    <div className="top-main grid  grid-cols-12 gap-3 justify-center ">
      <div className="col-span-12 sm:col-span-4 bg-[#444] rounded-[30px] p-3 text-white" style={{ filter: "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))" }}>
        <h4 className="text-center text-4xl font-bold ">{cityName || "Location Name"}</h4>
        <div className="flex flex-col m-auto">
          <div className="text-center text-8xl font-bold">{currentTime.format("HH:mm")}</div>
          <h6 className="text-center text-xl">{currentTime.format("dddd, DD MMM")}</h6>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-8 bg-[#444] rounded-[30px] p-3  ">
        <div className="grid grid-cols-12">
          <div className="weather-temperature mb-3 col-span-12 sm:col-span-4">
            <div className="text-temperature">{weatherData.temperature && `${(weatherData.temperature - 273.15).toFixed(0)}°C`}</div>
            <div className="sub-text-temperature">
              {feelsLike && `Feels like: ${(feelsLike - 273.15).toFixed(0)}`} <span className="celc-temp">°</span> C
            </div>
            <div className="sunrise flex gap-2 mb-3 text-white">
              <Image src="weather-icon/sunrise-white 1.svg" width={38} height={28} alt="Sunrise Image" />
              <div className="sunrise-info">
                <div className="title">Sunrise</div>
                <div className="time">{sunrise}</div>{" "}
              </div>
            </div>
            <div className="sunset flex gap-2 mb-3 text-white">
              <Image src="weather-icon/sunset-white 1.svg" width={38} height={28} alt="Sunrise Image" />
              <div className="sunset-info">
                <div className="title">Sunrise</div>
                <div className="time">{sunset}</div>
              </div>
            </div>
          </div>
          <div className="weather-image col-span-12 sm:col-span-4">
            <Image src="weather-icon/clear 1.svg" width={270} height={270} alt="Sunny Image" />
            <div className="text-center text-2xl font-semibold text-white">Sunny</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-white col-span-12 sm:col-span-4">
            <div className="flex items-center flex-col gap-2">
              <Image src="weather-icon/humidity 1.svg" width={60} height={50} alt="Humidity Image" />
              <div className="text-center text-xl font-semibold">{humidity}%</div>
              <div className="text-center text-base font-medium">Humidity</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              {" "}
              <Image src="weather-icon/wind 1.svg" width={53} height={50} alt="Wind Image" />
              <div className="text-center text-xl font-semibold">{windSpeed} Km/h</div>
              <div className="text-center text-base font-medium">Wind Speed</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <Image src="weather-icon/pressure-white 1.svg" width={60} height={50} alt="Humidity Image" />
              <div className="text-center text-xl font-semibold">{pressure}hPa</div>
              <div className="text-center text-base font-medium">Pressure</div>
            </div>
            <div className="flex items-center flex-col gap-2">
              {" "}
              <Image src="weather-icon/uv-white 1.svg" width={60} height={60} alt="Wind Image" />
              <div className="text-center text-xl font-semibold">{windSpeed} Km/h</div>
              <div className="text-center text-base font-medium">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
