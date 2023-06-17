/*
  Warnings:

  - Added the required column `address` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completionConditions` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costs` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formOfStudy` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfSemesters` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onlineHours` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisator` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruitmentConditions` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syllabus` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinates` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regon` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Major" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "approvedOnlineStudy" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "certificates" TEXT[],
ADD COLUMN     "completionConditions" TEXT NOT NULL,
ADD COLUMN     "costs" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "daysOfWeek" "DaysOfWeek"[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "formOfStudy" TEXT NOT NULL,
ADD COLUMN     "numberOfSemesters" INTEGER NOT NULL,
ADD COLUMN     "onlineHours" INTEGER NOT NULL,
ADD COLUMN     "organisator" TEXT NOT NULL,
ADD COLUMN     "recruitmentConditions" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL,
ADD COLUMN     "syllabus" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "coordinates" TEXT NOT NULL,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nip" TEXT NOT NULL,
ADD COLUMN     "regon" TEXT NOT NULL,
ADD COLUMN     "unitType" TEXT NOT NULL DEFAULT 'uczelnia',
ADD COLUMN     "website" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voivodeship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Voivodeship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "voivodeshipId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactPerson_majorId_key" ON "ContactPerson"("majorId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_unitId_key" ON "Address"("unitId");

-- AddForeignKey
ALTER TABLE "ContactPerson" ADD CONSTRAINT "ContactPerson_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_voivodeshipId_fkey" FOREIGN KEY ("voivodeshipId") REFERENCES "Voivodeship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
