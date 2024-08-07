"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

import { motion } from "framer-motion";

interface ActionProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export const Actions = ({ isFollowing, isHost, hostIdentity }: ActionProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.075,
        opacity: 0.95,
        transition: { duration: 0.15, type: "spring" },
      }}
    >
      <Button
        disabled={isPending || isHost}
        onClick={toggleFollow}
        variant={"primary"}
        size={"sm"}
        className="w-full lg:w-auto"
      >
        <Heart
          className={cn(
            "h-4 w-4 mr-2",
            isFollowing ? "fill-white" : "fill-none"
          )}
        />
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </motion.div>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
