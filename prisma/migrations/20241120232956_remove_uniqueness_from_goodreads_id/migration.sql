-- DropIndex
DROP INDEX "GoodreadsBook_goodreadsId_key";

-- AlterTable
ALTER TABLE "GoodreadsBook" ALTER COLUMN "goodreadsId" DROP NOT NULL;
