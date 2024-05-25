"use client";

import { CheckCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    if (!value) {
      return;
    } else {
      setIsCopied(true);
      navigator.clipboard.writeText(value);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };
  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button
      disabled={!value || isCopied}
      variant={"ghost"}
      size={"sm"}
      onClick={onCopy}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
