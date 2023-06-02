/*
  Warnings:

  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserImage";

-- CreateTable
CREATE TABLE "posts_likes" (
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "posts_likes_pkey" PRIMARY KEY ("post_id","user_id")
);

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
