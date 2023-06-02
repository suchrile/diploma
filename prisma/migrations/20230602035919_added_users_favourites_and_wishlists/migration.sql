-- CreateTable
CREATE TABLE "users_favourites" (
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    CONSTRAINT "users_favourites_pkey" PRIMARY KEY ("user_id","movie_id")
);

-- CreateTable
CREATE TABLE "users_wishlists" (
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    CONSTRAINT "users_wishlists_pkey" PRIMARY KEY ("user_id","movie_id")
);

-- AddForeignKey
ALTER TABLE "users_favourites" ADD CONSTRAINT "users_favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_wishlists" ADD CONSTRAINT "users_wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
