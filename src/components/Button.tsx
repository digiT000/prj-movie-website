import React from "react";
import LoadingLoader from "./LoadingSpinner";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  onClick,
  disabled,
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      className={`text-body-M px-1 py-4 w-full rounded-lg flex items-center gap-2 justify-center  ${
        disabled
          ? "bg-greyish_blue opacity-50 cursor-not-allowed"
          : "hover:bg-pure_white hover:text-dark_blue bg-red transition duration-300 ease-in-out"
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled || false}
    >
      {isLoading ? <LoadingLoader /> : null}
      {children}
    </button>
  );
}
