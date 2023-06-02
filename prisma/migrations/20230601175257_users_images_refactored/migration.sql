/*
  Warnings:

  - You are about to drop the column `background_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "background_url",
DROP COLUMN "photo_url";

-- CreateTable
CREATE TABLE "users_images" (
    "user_id" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "background_url" TEXT NOT NULL,
    "avatar_public_id" TEXT NOT NULL,
    "background_public_id" TEXT NOT NULL,

    CONSTRAINT "users_images_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "users_images" ADD CONSTRAINT "users_images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
