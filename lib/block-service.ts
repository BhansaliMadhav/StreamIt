import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({ where: { id: id } });

    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      throw new Error("Cant block yourself");
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    });
    console.log("existing block", existingBlock);

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const isBlockedByHost = async (hostId: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({ where: { id: self.id } });

    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === hostId) {
      throw new Error("Can't block yourself");
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: hostId,
        blockedId: otherUser.id,
      },
    });

    return !!existingBlock;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot Block yourself");
  }

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: { blockerId: self.id, blockedId: otherUser.id },
    },
  });

  if (!!existingBlock) {
    throw new Error("Already Blocked!");
  }
  const block = await db.block.create({
    data: { blockerId: self.id, blockedId: otherUser.id },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cant block/unblock yourself");
  }
  const otherUser = await db.user.findUnique({ where: { id } });
  if (!otherUser) {
    throw new Error("User not found");
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: { blockerId: self.id, blockedId: otherUser.id },
    },
  });

  if (!existingBlock) {
    throw new Error("Not Blocked");
  }
  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: { blocked: true },
  });
  return unblock;
};

export const getBlockedUser = async () => {
  const self = await getSelf();
  const blockedUser = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });
  return blockedUser;
};
