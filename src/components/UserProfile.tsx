import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  isOpen: boolean;
  // status: "loading" | "authenticated" | "unauthenticated";
}

export default function UserProfile({ isOpen }: UserProfileProps) {
  const router = useRouter();
  const { data, status } = useSession();

  switch (status) {
    case "authenticated":
      return (
        <div
          className={`flex gap-3 items-center rounded-2xl hover:bg-dark_blue transition-all ease-in-out ${
            isOpen ? "p-3" : "px-0"
          }`}
        >
          <Image
            src={data?.user?.image || "/dummyProfile.jpeg"}
            alt="profile image"
            width={100}
            height={100}
            className="w-10 h-10 rounded-full object-cover"
          />
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={
              isOpen ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-body-S line-clamp-2"
          >
            {data?.user?.name}
          </motion.span>
        </div>
      );

    case "loading":
      return (
        <div className="w-full h-10 rounded-full bg-dark_blue animate-pulse"></div>
      );
    case "unauthenticated":
      return (
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={() => router.push("/auth/login")} type="button">
            {isOpen ? "Login" : <LogIn />}
          </Button>
        </div>
      );
    default:
      break;
  }
}
