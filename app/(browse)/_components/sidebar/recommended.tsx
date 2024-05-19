"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItems } from "./user-items";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  //   console.log(data.length);

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItems
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className=" min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1 ">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
