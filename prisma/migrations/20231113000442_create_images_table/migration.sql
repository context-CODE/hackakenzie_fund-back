-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "path" TEXT NOT NULL,
    "cloudinaryId" VARCHAR(16) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_cloudinaryId_key" ON "images"("cloudinaryId");
