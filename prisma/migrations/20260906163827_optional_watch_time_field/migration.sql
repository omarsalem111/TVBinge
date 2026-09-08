/*
  Warnings:

  - Made the column `backdropPath` on table `Show` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logoPath` on table `Show` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Show" ALTER COLUMN "backdropPath" SET NOT NULL,
ALTER COLUMN "logoPath" SET NOT NULL;

-- AlterTable
ALTER TABLE "WatchedEpisode" ALTER COLUMN "watchedAt" DROP NOT NULL;
