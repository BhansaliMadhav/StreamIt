"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };
  return (
    <motion.form
      initial={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        opacity: 0.95,
        transition: { duration: 0.15 },
      }}
      whileFocus={{ scale: 1, transition: { duration: 0.2 } }}
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Search"
        className={cn(
          "rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
        )}
      />

      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}
        whileFocus={{ scale: 1, opacity: 1, transition: { duration: 0.15 } }}
        whileTap={{
          scale: 1,
          opacity: 1,
          backgroundColor: "f5f5f5",
          transition: { duration: 0.2 },
        }}
      >
        <Button
          type="submit"
          size={"sm"}
          variant={"secondary"}
          className="rounded-l-none"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </motion.div>
    </motion.form>
  );
};
