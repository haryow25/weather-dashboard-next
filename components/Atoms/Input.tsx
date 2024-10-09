import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, ...props }) => (
  <div className="form-control rounded-full relative w-full ">
    {icon && (
      <div className="absolute top-2 left-2 text-2xl text-gray-400">{icon}</div>
    )}
    <input
      {...props}
      className={`input shadow-md w-full text-sm rounded-full border-0 bg-[#444] p-3  text-white ${
        icon ? "pl-10" : ""
      }`}
      style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)" }}
    />
  </div>
);
