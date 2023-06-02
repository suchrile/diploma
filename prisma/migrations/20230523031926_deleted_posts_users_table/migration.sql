/*
  Warnings:

  - You are about to drop the `posts_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_users" DROP CONSTRAINT "posts_users_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_users" DROP CONSTRAINT "posts_users_user_id_fkey";

-- DropTable
DROP TABLE "posts_users";

-- CreateTable
CREATE TABLE "_posts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_posts_AB_unique" ON "_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_posts_B_index" ON "_posts"("B");

-- AddForeignKey
ALTER TABLE "_posts" ADD CONSTRAINT "_posts_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_posts" ADD CONSTRAINT "_posts_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
