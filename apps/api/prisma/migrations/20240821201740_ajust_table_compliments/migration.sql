/*
  Warnings:

  - Added the required column `receiver_id` to the `compliments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `compliments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliments" ADD COLUMN     "receiver_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "compliments" ADD CONSTRAINT "compliments_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
