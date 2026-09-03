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
    create: { id, name, posterPath },
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
