import { prisma } from "./prisma";

export async function addToWatched(userId, showId, episodeId) {
  await prisma.userShow.upsert({
    create: { userId, showId },
    update: {},
    where: {
      userId_showId: {
        userId,
        showId,
      },
    },
  });
  await prisma.watchedEpisode.create({
    data: {
      userId,
      showId,
      episodeId,
    },
  });
}

export async function getWatchedState(userId, showId, episodeId) {
  return await prisma.watchedEpisode.findUnique({
    where: {
      userId_showId_episodeId: { userId, showId, episodeId },
    },
  });
}

export async function getShowState(userId, showId) {
  return await prisma.userShow.findUnique({
    where: {
      userId_showId: { userId, showId },
    },
  });
}

export async function deleteUserEpisodeEntry(userId, showId, episodeId) {
  return await prisma.watchedEpisode.delete({
    where: {
      userId_showId_episodeId: { userId, showId, episodeId },
    },
  });
}

export async function getWatchedShows(userId) {
  return await prisma.userShow.findMany({
    where: { userId },
    include: {
      watchedEpisodes: {
        include: {
          episode: true,
        },
      },
    },
  });
}

export async function getWatchHistory(userId) {
  return await prisma.watchedEpisode.findMany({
    where: { userId },
    include: {
      episode: {
        include: {
          show: true,
        },
      },
    },
    orderBy: {
      watchedAt: "desc",
    },
  });
}
