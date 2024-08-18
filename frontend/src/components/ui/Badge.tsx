import React from "react";

const Badge = ({ variant = "primary", className = "", children }) => {
  const baseStyles = "inline-flex items-center px-5.5 py-0.5 rounded-full font-medium";
  const variantStyles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>;
};

export default Badge;
