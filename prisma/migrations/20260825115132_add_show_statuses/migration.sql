-- CreateEnum
CREATE TYPE "ShowStatus" AS ENUM ('WATCHING', 'COMPLETED', 'PAUSED', 'DROPPED', 'WATCHLISTED');

-- CreateTable
CREATE TABLE "UserShow" (
    "userId" TEXT NOT NULL,
    "showId" INTEGER NOT NULL,
    "showStatus" "ShowStatus" NOT NULL DEFAULT 'WATCHING',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserShow_pkey" PRIMARY KEY ("userId","showId")
);

-- AddForeignKey
ALTER TABLE "UserShow" ADD CONSTRAINT "UserShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShow" ADD CONSTRAINT "UserShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
