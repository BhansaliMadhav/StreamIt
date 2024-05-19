import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { error } from "console";

export const getSelf = async () => {
  const self = await currentUser();
  // console.log(self);

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });
  if (!user) {
    throw new Error("Not found");
  }
  return user;
};
