/*
  Warnings:

  - Added the required column `goodreadsId` to the `GoodreadsBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoodreadsBook" ADD COLUMN     "goodreadsId" INTEGER NOT NULL;
