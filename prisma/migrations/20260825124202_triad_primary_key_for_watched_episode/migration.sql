/*
  Warnings:

  - The primary key for the `WatchedEpisode` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "WatchedEpisode" DROP CONSTRAINT "WatchedEpisode_pkey",
ADD CONSTRAINT "WatchedEpisode_pkey" PRIMARY KEY ("userId", "showId", "episodeId");
