/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_unitId_fkey";

-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "UnitAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "UnitAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitAddress_unitId_key" ON "UnitAddress"("unitId");

-- AddForeignKey
ALTER TABLE "UnitAddress" ADD CONSTRAINT "UnitAddress_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitAddress" ADD CONSTRAINT "UnitAddress_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
