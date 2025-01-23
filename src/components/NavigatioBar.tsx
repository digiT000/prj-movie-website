import Image from "next/image";
import React from "react";
import { Menu } from "lucide-react";

export default function NavigationBar() {
  return (
    <aside className="inline-block md:hidden p-5">
      <div
        className={`flex flex-col gap-10 justify-between bg-semi_dark_blue p-4 rounded-2xl w-full`}
      >
        {/* LOGO SECTION */}
        <div className="relative w-full flex justify-between items-center">
          <Image
            src={"/logo.svg"}
            width={200}
            height={200}
            className="w-10 h-10 "
            alt="logo"
            fetchPriority="auto"
          />
          <button className="bg-greyish_blue p-2 rounded-full flex justify-center items-center">
            <Menu width={20} height={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
