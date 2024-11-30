/*
  Warnings:

  - You are about to drop the column `author` on the `GoodreadsBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodreadsBook" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoodreadsBook" ADD CONSTRAINT "GoodreadsBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
