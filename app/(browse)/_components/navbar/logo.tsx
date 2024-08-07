"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { motion } from "framer-motion";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <motion.div
      whileHover={{ opacity: 0.75, scale: 1.05, transition: { duration: 0.1 } }}
    >
      <Link href={"/"}>
        <div className="flex items-center gap-x-4">
          <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
            <Image
              src={"/spooky.svg"}
              alt="StreamIt"
              height={"32"}
              width={"32"}
            />
          </div>
          <div className={cn("hidden lg:block", font.className)}>
            <p className=" text-lg font-semibold">StreamIt</p>
            <p className=" text-xs text-muted-foreground">Let&apos;s Stream</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
