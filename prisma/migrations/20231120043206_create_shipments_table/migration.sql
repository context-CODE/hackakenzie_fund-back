-- CreateEnum
CREATE TYPE "Role" AS ENUM ('standard', 'fast');

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "trackCode" VARCHAR,
    "shippedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deliveredUntil" TIMESTAMP(3) NOT NULL,
    "option" "Role" NOT NULL DEFAULT 'standard',
    "addressId" TEXT NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
