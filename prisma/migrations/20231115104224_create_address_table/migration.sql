-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "responsible" CHAR(90) NOT NULL,
    "district" CHAR(50) NOT NULL,
    "zipCode" CHAR(8) NOT NULL,
    "street" CHAR(50) NOT NULL,
    "city" CHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "number" CHAR(5) NOT NULL DEFAULT '',
    "complement" CHAR(20) NOT NULL DEFAULT '',
    "reference" CHAR(30) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
