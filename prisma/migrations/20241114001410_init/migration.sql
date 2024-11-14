-- CreateTable
CREATE TABLE "GoodreadsBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "imageURL" TEXT,
    "externalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodreadsBook_pkey" PRIMARY KEY ("id")
);
