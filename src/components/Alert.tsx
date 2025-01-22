import { CircleAlert } from "lucide-react";
import React from "react";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

export default function Alert({ message, type }: AlertProps) {
  const baseStyle = `w-full bg-opacity-10 text-body-M px-4 py-3 rounded-lg border flex gap-4 items-center`;

  switch (type) {
    case "error":
      return (
        <div className={`${baseStyle} bg-red border-red`}>
          <CircleAlert className=" text-red" />
          <span className="text-body-M"> {message}</span>
        </div>
      );

    case "success":
      return (
        <div className={`${baseStyle} bg-red border-red`}>
          <CircleAlert className=" text-red" />
          <span className="text-body-M"> {message}</span>
        </div>
      );
  }
}
