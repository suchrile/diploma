/*
  Warnings:

  - Added the required column `text` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "movie_id" INTEGER,
ADD COLUMN     "movie_rating" INTEGER,
ADD COLUMN     "text" TEXT NOT NULL;
