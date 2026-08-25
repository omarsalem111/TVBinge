/*
  Warnings:

  - Added the required column `showId` to the `WatchedEpisode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchedEpisode" ADD COLUMN     "showId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WatchedEpisode" ADD CONSTRAINT "WatchedEpisode_userId_showId_fkey" FOREIGN KEY ("userId", "showId") REFERENCES "UserShow"("userId", "showId") ON DELETE RESTRICT ON UPDATE CASCADE;
