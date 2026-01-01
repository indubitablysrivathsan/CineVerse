/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `Film` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "tmdbId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Film_tmdbId_key" ON "Film"("tmdbId");
