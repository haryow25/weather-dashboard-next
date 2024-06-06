export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  pressure: number;
}

export interface Location {
  lat: number;
  lon: number;
}
