import React from "react";
import { Skeleton } from "../Atoms/Skeleton";

export const SkeletonForecastItem: React.FC = () => (
  <li className="forecast-item grid grid-cols-12 gap-5 text-start items-center">
    <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex items-center gap-2 flex-wrap">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-20 h-8" />
    </div>
    <Skeleton className="w-40 h-8 col-span-12 sm:col-span-6 lg:col-span-7" />
  </li>
);
