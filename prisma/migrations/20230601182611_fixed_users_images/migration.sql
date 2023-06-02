-- AlterTable
ALTER TABLE "users_images" ALTER COLUMN "avatar_url" DROP NOT NULL,
ALTER COLUMN "background_url" DROP NOT NULL,
ALTER COLUMN "avatar_public_id" DROP NOT NULL,
ALTER COLUMN "background_public_id" DROP NOT NULL;
