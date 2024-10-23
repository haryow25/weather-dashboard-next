import React, { useState } from "react";
import axios from "axios";
import { Toggle } from "../Atoms/Toggle";
import { SearchBar } from "../Molecules/SearchBar";
import { Button } from "../Atoms/Button";
import { HiMenu, HiX } from "react-icons/hi";
import useWeatherStore from "@/store/useWeatherStore";
import moment from "moment";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const { setCityName, setCurrentTime, setSearchLocation } = useWeatherStore();
  const handleSearch = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`
      );

      if (geoResponse.data && geoResponse.data.length > 0) {
        const { name, lat, lon } = geoResponse.data[0];
        setCityName(name);
        setSearchLocation({ lat, lon });

        // Get the timezone offset for the location
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        if (weatherResponse.data && weatherResponse.data.timezone) {
          const timezoneOffset = weatherResponse.data.timezone;
          const currentTime = moment().utcOffset(timezoneOffset / 60);
          setCurrentTime(currentTime);
        }
      } else {
        setErrorMessage("No results found.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      setErrorMessage("Error searching location. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    console.log("Dark mode:", checked);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="sm:hidden flex justify-between items-center p-4 bg-[#4CBB17]">
        <div className="text-white text-2xl font-bold">Weather App</div>
        <button
          className="text-white text-3xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar (Visible on mobile, hidden on large screens) */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-90 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <div className="flex flex-col items-start p-6 space-y-6">
          <Toggle label="Dark Mode" onChange={handleDarkModeToggle} />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
          <Button
            loading={loading}
            icon="/weather-icon/current location icon.svg"
            iconAlt="search"
            onClick={handleSearch}
          >
            Current Location
          </Button>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
      </div>

      {/* Regular Header (Visible on larger screens) */}
      <div className="hidden sm:grid grid-cols-12 text-sm mb-4 gap-3">
        <div className="col-span-2 sm:col-span-2 mr-auto">
          <Toggle label="Dark Mode" onChange={handleDarkModeToggle} />
        </div>

        <div className="col-span-8 sm:col-span-7">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <div className="col-span-2 sm:col-span-3 ml-auto">
          <Button
            loading={loading}
            icon="/weather-icon/current-location-icon.svg"
            iconAlt="search"
            onClick={handleSearch}
          >
            Current Location
          </Button>
        </div>

        {errorMessage && (
          <div className="text-red-500 col-span-12">{errorMessage}</div>
        )}
      </div>
    </>
  );
};
