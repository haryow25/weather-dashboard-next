import React, { FC } from "react";
import Image from "next/image";
import moment from "moment";
import useSWR from "swr";
import {
  fetchWeatherData,
  fetchHourlyForecast,
  getCurrentPosition,
} from "../../hooks/forecastApi";

interface BotContentProps {}

const windIconUrl = "/weather-icon/navigation 1.svg"; // Replace with actual URL if available

const BotContent: FC<BotContentProps> = () => {
  const { data: position, error: positionError } = useSWR(
    "position",
    getCurrentPosition
  );

  const { data: weatherData, error: weatherError } = useSWR(
    () =>
      position && [
        "weatherData",
        position.coords.latitude,
        position.coords.longitude,
      ],
    () =>
      fetchWeatherData(position!.coords.latitude, position!.coords.longitude),
    { revalidateOnFocus: false }
  );

  const { data: hourlyForecast, error: hourlyError } = useSWR(
    () =>
      position && [
        "hourlyForecast",
        position.coords.latitude,
        position.coords.longitude,
      ],
    () =>
      fetchHourlyForecast(
        position!.coords.latitude,
        position!.coords.longitude
      ),
    { revalidateOnFocus: false }
  );

  if (positionError || weatherError || hourlyError) {
    return (
      <div>
        Error:{" "}
        {positionError?.message ||
          weatherError?.message ||
          hourlyError?.message}
      </div>
    );
  }

  if (!weatherData || !hourlyForecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bot-main grid grid-cols-12 gap-3  my-3">
      <div
        className="five-day-forecast col-span-12 sm:col-span-4 bg-[#444] rounded-[30px] p-3 text-white"
        style={{ filter: "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))" }}
      >
        <h1 className="five-day-forecast-title p-3 flex justify-center font-bold text-3xl">
          5 Days Forecast:
        </h1>
        <ul className="forecast-list">
          {weatherData.list
            .filter((item, index) => index % 8 === 0)
            .map((item, index) => (
              <li
                key={index}
                className="forecast-item grid grid-cols-12 gap-5 text-start items-center"
              >
                <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex items-center gap-2 flex-wrap">
                  <Image
                    src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="weather icon"
                    width={64}
                    height={64}
                    className="col-span-2"
                  />
                  <div className="forecast-weather text-2xl font-semibold">
                    {item.main.temp}°C
                  </div>
                </div>

                <div className="forecast-date text-2xl font-semibold col-span-12 sm:col-span-6 lg:col-span-7">
                  {moment(item.dt_txt).format("dddd, D MMM")}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div
        className="hourly-forecast col-span-12 sm:col-span-8 bg-[#444] rounded-[30px] p-5"
        style={{ boxShadow: "10px 10px 4px 0px rgba(0, 0, 0, 0.50)" }}
      >
        <div className="flex items-center justify-center text-3xl text-white">
          <b>Hourly Forecast:</b>
        </div>
        <div className="list-hourly-forecast grid grid-cols-1 sm:grid-cols-4 gap-3 my-3 text-white font-bold">
          {hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="hourly-forecast-item bg-[#373636] rounded-[40px] flex items-center flex-col justify-center p-3 gap-3"
            >
              <div className="text-2xl">
                {moment(hour.dt_txt).format("H:mm")}
              </div>
              <Image
                src={`https://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                alt="weather icon"
                width={80}
                height={80}
              />
              <div className="text-xl">{hour.main.temp}°C</div>
              <div className="text-xl relative flex items-center flex-col gap-2 text-center">
                <Image
                  src={windIconUrl}
                  alt="wind icon"
                  width={55}
                  height={55}
                  style={{
                    transform: `rotate(${hour.wind.deg}deg)`,
                    transition: "transform 0.3s",
                  }}
                />
                {hour.wind.speed} km/h
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotContent;
