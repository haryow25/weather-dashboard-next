import React from "react";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: string;
  iconAlt?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  icon,
  iconAlt,
  ...props
}) => (
  <button
    className="flex items-center justify-center gap-2 bg-[#4CBB17] p-3 text-[#ffffffcc] rounded-full hover:bg-[#4CBB17] text-base font-extrabold"
    {...props}
  >
    {loading ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="animate-spin w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3.5 3.5M12 16.63V20M12 3h.01" />
      </svg>
    ) : (
      <>
        {icon && (
          <Image src={icon} alt={iconAlt || ""} width={25} height={20} />
        )}
        <div>{children}</div>
      </>
    )}
  </button>
);
