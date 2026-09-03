import { verifySession } from "../validations/session";
import { prisma } from "./prisma";

export async function checkExistingUser(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser({ username, email, passwordHash }) {
  return await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
    },
    select: {
      id: true,
    },
  });
}

export async function getUserbyID() {
  const session = await verifySession();
  if (session) {
    return await prisma.user.findUnique({
      where: {
        id: session.userID,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  } else {
    return { id: null };
  }
}
