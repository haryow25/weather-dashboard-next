import React from "react";
import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  style = {},
}) => (
  <Image
    src={src}
    width={width}
    height={height}
    alt={alt}
    className={`w-auto h-auto ${className}`}
    style={style}
  />
);
