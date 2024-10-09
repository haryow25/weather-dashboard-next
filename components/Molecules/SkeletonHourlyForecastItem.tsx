import React from "react";
import { Skeleton } from "../Atoms/Skeleton";

export const SkeletonHourlyForecastItem: React.FC = () => (
  <div className="hourly-forecast-item bg-[#373636] rounded-[40px] flex items-center flex-col justify-center p-3 gap-3">
    <Skeleton className="w-16 h-6 mb-2" />
    <Skeleton className="w-20 h-20 rounded-full mb-2" />
    <Skeleton className="w-16 h-6 mb-2" />
    <Skeleton className="w-14 h-14 rounded-full mb-2" />
    <Skeleton className="w-20 h-6" />
  </div>
);
