-- CreateTable
CREATE TABLE "users_users" (
    "follower_id" INTEGER NOT NULL,
    "followable_id" INTEGER NOT NULL,

    CONSTRAINT "users_users_pkey" PRIMARY KEY ("follower_id","followable_id")
);

-- AddForeignKey
ALTER TABLE "users_users" ADD CONSTRAINT "users_users_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_users" ADD CONSTRAINT "users_users_followable_id_fkey" FOREIGN KEY ("followable_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
