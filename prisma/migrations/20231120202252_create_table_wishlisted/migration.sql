/*
  Warnings:

  - You are about to drop the column `productId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "productId";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "wishlisted" (
    "id" TEXT NOT NULL,
    "addAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wishlisted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlisted_userId_key" ON "wishlisted"("userId");

-- AddForeignKey
ALTER TABLE "wishlisted" ADD CONSTRAINT "wishlisted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
