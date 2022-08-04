import React from "react";

const ButtonPrimary = ({
  onClick,
  type = "button",
  bgColor = "primary",
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg capitalize bg-${bgColor} w-full mt-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
