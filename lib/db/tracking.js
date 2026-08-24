import { prisma } from "./prisma";

export async function addToWatched(userId, episodeId) {
  await prisma.watchedEpisode.create({
    data: {
      userId,
      episodeId,
    },
  });
}

export async function getWatchedState(userId, episodeId) {
  return await prisma.watchedEpisode.findUnique({
    where: {
      userId_episodeId: { userId, episodeId },
    },
  });
}

export async function deleteUserEpisodeEntry(userId, episodeId) {
  return await prisma.watchedEpisode.delete({
    where: {
      userId_episodeId: { userId, episodeId },
    },
  });
}
