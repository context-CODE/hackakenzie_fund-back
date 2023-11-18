-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "slug" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "addreses" (
    "id" TEXT NOT NULL,
    "responsible" VARCHAR(90) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "zipCode" CHAR(8) NOT NULL,
    "street" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "number" VARCHAR(5) NOT NULL DEFAULT '',
    "complement" VARCHAR(20) NOT NULL DEFAULT '',
    "reference" VARCHAR(30) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "addreses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addreses" ADD CONSTRAINT "addreses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
