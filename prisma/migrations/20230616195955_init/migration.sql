/*
  Warnings:

  - You are about to drop the `MajorCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MyRelationTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_B_fkey";

-- DropTable
DROP TABLE "MajorCategory";

-- DropTable
DROP TABLE "_MyRelationTable";

-- CreateTable
CREATE TABLE "MajorQualification" (
    "id" SERIAL NOT NULL,
    "majorId" INTEGER NOT NULL,
    "qualificationId" INTEGER NOT NULL,

    CONSTRAINT "MajorQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MajorType" NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_name_key" ON "Qualification"("name");

-- AddForeignKey
ALTER TABLE "MajorQualification" ADD CONSTRAINT "MajorQualification_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorQualification" ADD CONSTRAINT "MajorQualification_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
