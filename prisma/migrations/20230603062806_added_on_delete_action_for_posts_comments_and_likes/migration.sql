-- DropForeignKey
ALTER TABLE "posts_comments" DROP CONSTRAINT "posts_comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_comments" DROP CONSTRAINT "posts_comments_post_id_fkey";

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
