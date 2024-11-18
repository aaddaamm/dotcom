/*
  Warnings:

  - You are about to drop the column `externalId` on the `GoodreadsBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `GoodreadsBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isbn13]` on the table `GoodreadsBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[asin]` on the table `GoodreadsBook` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GoodreadsBook" DROP COLUMN "externalId";

-- CreateIndex
CREATE UNIQUE INDEX "GoodreadsBook_isbn_key" ON "GoodreadsBook"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "GoodreadsBook_isbn13_key" ON "GoodreadsBook"("isbn13");

-- CreateIndex
CREATE UNIQUE INDEX "GoodreadsBook_asin_key" ON "GoodreadsBook"("asin");
