/*
  Warnings:

  - Added the required column `slug` to the `ForumCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForumCategory" ADD COLUMN     "slug" TEXT NOT NULL;
