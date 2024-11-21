/*
  Warnings:

  - You are about to drop the column `goodreadsBookId` on the `DateRead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DateRead" DROP CONSTRAINT "DateRead_goodreadsBookId_fkey";

-- AlterTable
ALTER TABLE "DateRead" DROP COLUMN "goodreadsBookId";

-- AlterTable
ALTER TABLE "GoodreadsBook" ADD COLUMN     "datesRead" TEXT,
ALTER COLUMN "dateStarted" SET DATA TYPE TEXT;
