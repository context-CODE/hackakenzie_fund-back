-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "minimum" INTEGER NOT NULL DEFAULT 1,
    "productId" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_productId_key" ON "stock"("productId");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
