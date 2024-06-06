"use client";
import React, { FC, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { HiMagnifyingGlass } from "react-icons/hi2";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${API_KEY}`);
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        // Call a function to fetch weather data based on lat and lon
        // fetchWeatherData(lat, lon);
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
  return (
    <div className="header grid grid-cols-12 text-sm mb-4 gap-3  ">
      <div className="col-span-2 md:col-span-4 ">
        <label
          className="flex flex-col justify-center gap-1 items-center cursor-pointer 
      "
        >
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-24 h-8 bg-[#D9D9D9] peer-focus:outline-none peer-focus:ring-4  rounded-full peer  peer-checked:after:translate-x-16 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[2px] after:bg-[#111111] after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#D9D9D9]"></div>
          <span className=" text-xl font-extrabold text-gray-900 dark:text-white ">Dark Mode</span>
        </label>
      </div>

      <div className="col-span-8 md:col-span-4">
        <div className="form-control rounded-full relative   ">
          <HiMagnifyingGlass className="absolute top-2 left-2  text-3xl text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="input shadow-md w-full text-sm rounded-full  border-0 bg-[#444] pl-10 "
            style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      <div className="col-span-2 md:col-span-4">
        <button className="btn bg-[#4CBB17] text-[#ffffffcc] rounded-full hover:bg-[#4CBB17] text-base   font-extrabold   " onClick={handleSearch}>
          {loading ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="animate-spin w-5 h-5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3.5 3.5M12 16.63V20M12 3h.01" />
            </svg>
          ) : (
            <>
              <Image src="/weather-icon/current location icon.svg" alt="search" width={25} height={20} />
              <div>Current Location</div>
            </>
          )}
        </button>
      </div>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default Header;
