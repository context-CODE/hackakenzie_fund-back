-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "slug" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "responsible" VARCHAR(90) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "zipCode" CHAR(8) NOT NULL,
    "street" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "number" VARCHAR(5) NOT NULL DEFAULT 's/n',
    "complement" VARCHAR(20),
    "reference" VARCHAR(30),
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
