/*
  Warnings:

  - Added the required column `unitId` to the `Major` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Major" ADD COLUMN     "unitId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
