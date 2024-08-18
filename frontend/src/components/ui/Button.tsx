import React from "react";

// MenuIcon Component
const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

// Button Component
const Button = ({ variant = "solid", className = "", children }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md p-2";
  const variantStyles = {
    solid: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
  };

  return <button className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</button>;
};

export default Button;
