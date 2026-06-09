-- AlterTable
ALTER TABLE "public"."Repository" ADD COLUMN     "description" TEXT,
ADD COLUMN     "forks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "stars" INTEGER NOT NULL DEFAULT 0;
