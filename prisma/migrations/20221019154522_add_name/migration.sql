/*
  Warnings:

  - Added the required column `name` to the `ForumCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ForumCategory" DROP CONSTRAINT "ForumCategory_userId_fkey";

-- AlterTable
ALTER TABLE "ForumCategory" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ForumCategory" ADD CONSTRAINT "ForumCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
