-- CreateTable
CREATE TABLE "wishlisted" (
    "id" TEXT NOT NULL,
    "addAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "wishlisted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlisted_userId_key" ON "wishlisted"("userId");

-- AddForeignKey
ALTER TABLE "wishlisted" ADD CONSTRAINT "wishlisted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlisted" ADD CONSTRAINT "wishlisted_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
