import React from "react";

interface ToggleProps {
  label: string;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, onChange }) => (
  <label className="flex flex-col justify-center gap-1 items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      onChange={e => onChange(e.target.checked)}
    />
    <div className="relative w-24 h-8 bg-[#D9D9D9] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-16 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[2px] after:bg-[#111111] after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#D9D9D9]"></div>
    <span className="text-xl font-extrabold text-gray-900 dark:text-white">
      {label}
    </span>
  </label>
);
