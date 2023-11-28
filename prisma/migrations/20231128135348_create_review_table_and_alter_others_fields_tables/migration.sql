/*
  Warnings:

  - The `option` column on the `shipments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('admin', 'client');

-- CreateEnum
CREATE TYPE "Option" AS ENUM ('standard', 'fast');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('analyzing', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "option",
ADD COLUMN     "option" "Option" NOT NULL DEFAULT 'standard';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "TypeUser" NOT NULL DEFAULT 'client';

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'analyzing',
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
