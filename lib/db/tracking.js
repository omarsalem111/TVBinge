import { prisma } from "./prisma";

export async function addEpisodeToWatched(userId, showId, episodeId) {
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
  if (!episodeId) {
    return await prisma.userShow.findUnique({
      where: {
        userId_showId: { userId, showId },
      },
    });
  } else {
    return await prisma.watchedEpisode.findUnique({
      where: {
        userId_showId_episodeId: { userId, showId, episodeId },
      },
    });
  }
}

export async function deleteUserShow(userId, showId) {
  await prisma.watchedEpisode.deleteMany({
    where: {
      userId,
      showId,
    },
  });
  return await prisma.userShow.delete({
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

export async function markShowCompleted(userId, showId, episodeIds) {
  return await prisma.$transaction([
    await prisma.userShow.upsert({
      where: {
        userId_showId: { userId, showId },
      },
      update: {
        showStatus: "COMPLETED",
      },
      create: {
        userId,
        showId,
        showStatus: "COMPLETED",
      },
    }),
    await prisma.watchedEpisode.createMany({
      data: episodeIds.map((episodeId) => ({
        userId,
        showId,
        episodeId,
        watchedAt: null,
      })),
      skipDuplicates: true,
    }),
  ]);
}

export async function getWatchHistory(userId) {
  return await prisma.watchedEpisode.findMany({
    where: {
      userId,
      watchedAt: {
        not: null,
      },
    },
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
