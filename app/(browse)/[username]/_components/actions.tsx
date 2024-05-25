"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock } from "@/actions/block";
import { revalidatePath } from "next/cache";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`Your are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something Went Wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`Your have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something Went Wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          toast.success(`Blocked the user ${data.blocked.username}`);
          revalidatePath(`/u/${data.blocked.username}`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant={"primary"}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        onClick={handleBlock}
        disabled={isPending}
        variant={"destructive"}
      >
        Block
      </Button>
    </>
  );
};
