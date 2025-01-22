import React from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`text-body-M p-4 w-full rounded-lg   ${
        disabled
          ? "bg-greyish_blue opacity-50 cursor-not-allowed"
          : "hover:bg-pure_white hover:text-dark_blue bg-red "
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled || false}
    >
      {label}
    </button>
  );
}
