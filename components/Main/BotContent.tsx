import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import axios from "axios";
import moment from "moment";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface BotContentProps {}

interface WeatherData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

interface HourlyForecast {
  dt: number; // Unix timestamp of the forecasted time
  dt_txt: string; // Date and time in text format
  main: {
    temp: number; // Temperature
    // ... other properties
  };
  weather: [
    {
      id: number; // Weather condition id
      main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
      description: string; // Weather condition within the group
      icon: string; // Weather icon id
    }
  ];
  wind: {
    speed: number; // Wind speed
    // ... other properties
  };
  // ... other properties
}

const BotContent: FC<BotContentProps> = ({}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[] | null>(null); // Define state for hourly forecast
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const [forecastResponse, hourlyResponse] = await Promise.all([
          axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
          axios.get<{ list: HourlyForecast[] }>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
        ]);

        setWeatherData(forecastResponse.data);

        const limitedHourlyForecast = hourlyResponse.data.list.slice(0, 4);
        setHourlyForecast(limitedHourlyForecast);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bot-main grid grid-cols-12 gap-3 justify-center my-3">
      <div className="five-day-forecast col-span-12 sm:col-span-4 bg-[#444] rounded-[30px] p-3 text-white" style={{ filter: "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))" }}>
        <h1 className="five-day-forecast-title p-3 flex justify-center font-bold text-3xl">5 Days Forecast:</h1>
        <ul className="forecast-list">
          {weatherData.list
            .slice(0, 40)
            .filter((item, index) => index % 8 === 0)
            .map((item, index) => (
              <li key={index} className="forecast-item grid grid-cols-12 gap-5 text-start items-center">
                <Image src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" width={64} height={64} layout="fixed" className="col-span-2" />
                <div className="forecast-weather text-2xl font-semibold col-span-4">{item.main.temp}°C</div>
                <div className="forecast-date text-2xl font-semibold col-span-6">{moment(item.dt_txt).format("dddd, D MMM")}</div>
              </li>
            ))}
        </ul>
      </div>
      <div className="hourly-forecast col-span-12 sm:col-span-8 bg-[#444] rounded-[30px] p-5" style={{ boxShadow: "10px 10px 4px 0px rgba(0, 0, 0, 0.50)" }}>
        <div className="flex items-center justify-center text-3xl text-white">
          <b>Hourly Forecast:</b>
        </div>
        <div className="list-hourly-forecast grid grid-cols-4 gap-3 my-3 text-white font-bold">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hourly-forecast-item bg-[#373636] rounded-[40px] flex items-center flex-col justify-center p-3 gap-3">
              <div className="text-2xl">{moment(hour.dt_txt).format("H:mm")}</div>
              <Image src={`https://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="weather icon" width={80} height={80} layout="fixed" />
              <div className="text-xl">{hour.main.temp}°C</div>
              <div className="text-xl">{hour.wind.speed}km/h</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotContent;
