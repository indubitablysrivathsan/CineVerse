-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "moods" TEXT,
ADD COLUMN     "pace" TEXT,
ADD COLUMN     "themes" TEXT;

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'private';
