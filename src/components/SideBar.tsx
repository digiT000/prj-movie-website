"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CircleChevronLeft } from "lucide-react";
import { navLinks } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();
  function handleOpenSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <aside className="hidden md:inline-block p-5">
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={{ width: isOpen ? "200px" : "72px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex flex-col gap-10 justify-between bg-semi_dark_blue p-4 rounded-2xl w-full h-full`}
      >
        <div className="flex flex-col gap-10 items-start">
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

            <button
              onClick={handleOpenSidebar}
              className="absolute -right-8 text-body-S bg-greyish_blue p-1 rounded-full flex justify-center items-center"
            >
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={isOpen ? { rotate: 0 } : { rotate: 180 }}
                transition={{ duration: 0.1, ease: "circInOut" }}
              >
                <CircleChevronLeft />
              </motion.svg>
            </button>
          </div>

          {/* BODY LINK */}
          <nav className="flex flex-col gap-8">
            {navLinks.map((link, key: number) => {
              const Icon = link.icon;
              return (
                <Link
                  key={key}
                  href={link.link}
                  className={`${
                    currentPath === link.link
                      ? "text-pure_white"
                      : "text-greyish_blue hover:text-pure_white"
                  } text-body-S flex items-center gap-3 transition-colors duration-300 ease-in-out`}
                >
                  {/* Ensure the icon maintains its size */}
                  <div className="flex items-center justify-center w-6 h-6">
                    <Icon size={20} />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={
                      isOpen
                        ? { opacity: 1, width: "auto" }
                        : { opacity: 0, width: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
        </div>
        <UserProfile isOpen={isOpen} />
      </motion.div>
    </aside>
  );
}
