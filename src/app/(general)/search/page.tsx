"use client";
import SearchContent from "@/components/section/SearchContent";

import React, { Suspense } from "react";

export default function SeachPage() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex justify-center items-center ">
            <p className="text-xl text-center text-pure_white font-bold">
              Loading...
            </p>
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </section>
  );
}
