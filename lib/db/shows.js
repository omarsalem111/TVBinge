import { prisma } from "./prisma";

export async function addOrUpdateShow({
  id,
  name,
  posterPath,
  logoPath,
  backdropPath,
}) {
  return await prisma.show.upsert({
    where: { id },
    update: { name, posterPath, logoPath, backdropPath },
    create: { id, name, posterPath, logoPath, backdropPath },
  });
}

export async function addOrUpdateEpisode(
  id,
  showId,
  seasonNumber,
  episodeNumber,
  name,
  stillPath,
) {
  return await prisma.episode.upsert({
    where: { id },
    update: { name, stillPath },
    create: { id, showId, seasonNumber, episodeNumber, name, stillPath },
  });
}

export async function addEpisodes(episodes) {
  return await prisma.episode.createMany({
    data: episodes.map((ep) => ({
      id: ep.id,
      showId: ep.showId,
      seasonNumber: ep.seasonNumber,
      episodeNumber: ep.episodeNumber,
      name: ep.name,
      stillPath: ep.stillPath,
    })),
    skipDuplicates: true,
  });
}
