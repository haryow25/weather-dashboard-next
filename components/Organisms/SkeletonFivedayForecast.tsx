import React from "react";
import { Skeleton } from "../Atoms/Skeleton";
import { SkeletonForecastItem } from "../Molecules/SkeletonForecastItem";

export const SkeletonFiveDayForecast: React.FC = () => (
  <div
    className="five-day-forecast col-span-12 sm:col-span-4 bg-[#444] rounded-[30px] p-3 text-white"
    style={{ filter: "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))" }}
  >
    <Skeleton className="w-48 h-10 mx-auto mb-4" />
    <ul className="forecast-list">
      {[...Array(5)].map((_, index) => (
        <SkeletonForecastItem key={index} />
      ))}
    </ul>
  </div>
);
