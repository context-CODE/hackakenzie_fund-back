/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `cartItems` table. All the data in the column will be lost.
  - Added the required column `subTotal` to the `cartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `orderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cartItems" DROP COLUMN "deletedAt",
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orderItems" ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
