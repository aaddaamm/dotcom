/*
  Warnings:

  - A unique constraint covering the columns `[goodreadsId]` on the table `GoodreadsBook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoodreadsBook_goodreadsId_key" ON "GoodreadsBook"("goodreadsId");
