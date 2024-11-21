/*
  Warnings:

  - You are about to drop the column `dateRead` on the `GoodreadsBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodreadsBook" DROP COLUMN "dateRead",
ADD COLUMN     "dateStarted" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "DateRead" (
    "id" SERIAL NOT NULL,
    "dateRead" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookId" INTEGER,
    "goodreadsBookId" INTEGER,

    CONSTRAINT "DateRead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DateRead" ADD CONSTRAINT "DateRead_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateRead" ADD CONSTRAINT "DateRead_goodreadsBookId_fkey" FOREIGN KEY ("goodreadsBookId") REFERENCES "GoodreadsBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
