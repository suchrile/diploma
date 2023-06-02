/*
  Warnings:

  - You are about to drop the column `favorites_count` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "favorites_count",
ADD COLUMN     "favourites_count" INTEGER NOT NULL DEFAULT 0;
