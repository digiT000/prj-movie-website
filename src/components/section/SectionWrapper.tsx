import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return <section className="flex flex-col gap-4">{children}</section>;
}
