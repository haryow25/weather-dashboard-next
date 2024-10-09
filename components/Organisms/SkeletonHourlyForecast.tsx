import React from "react";
import { Skeleton } from "../Atoms/Skeleton";
import { SkeletonHourlyForecastItem } from "../Molecules/SkeletonHourlyForecastItem";

export const SkeletonHourlyForecast: React.FC = () => (
  <div
    className="hourly-forecast col-span-12 sm:col-span-8 bg-[#444] rounded-[30px] p-5"
    style={{ boxShadow: "10px 10px 4px 0px rgba(0, 0, 0, 0.50)" }}
  >
    <Skeleton className="w-48 h-10 mx-auto mb-4" />
    <div className="list-hourly-forecast grid grid-cols-1 sm:grid-cols-4 gap-3 my-3">
      {[...Array(8)].map((_, index) => (
        <SkeletonHourlyForecastItem key={index} />
      ))}
    </div>
  </div>
);
