// import axios from "axios";
// import moment from "moment";
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// import { WeatherData } from "../types/type";
// export const fetchWeatherData = async (location: Location): Promise<WeatherData | null> => {
//   try {
//     const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);
//     const { data } = response;

//     if (data.main && data.name && data.sys && data.wind) {
//       const formattedSunrise = moment.unix(data.sys.sunrise).format("HH:mm");
//       const formattedSunset = moment.unix(data.sys.sunset).format("HH:mm");

//       return {
//         cityName: data.name,
//         temperature: data.main.temp,
//         feelsLike: data.main.feels_like,
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed,
//         sunrise: formattedSunrise,
//         sunset: formattedSunset,
//         pressure: data.main.pressure,
//       };
//     } else {
//       console.error("Error fetching weather data: Incomplete response data");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     return null;
//   }
// };

// export const formatTime = (timestamp: moment.MomentInput) => moment.unix(timestamp).format("HH:mm"); // Assuming you still use moment

// console.log("formatTime", formatTime);
