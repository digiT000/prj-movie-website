import React from "react";

interface InputFieldProps {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  type: "email" | "password" | "text";
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  name,
  onChange,
  placeholder,
  value,
  type,
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="bg-transparent text-body-M border-b-2 p-3 border-b-greyish_blue active:border-greyish_blue focus-visible:border-greyish_blue"
      value={value}
      onChange={onChange}
    />
  );
}
