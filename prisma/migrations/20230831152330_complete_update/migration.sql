/*
  Warnings:

  - You are about to drop the column `approvedOnlineStudy` on the `Major` table. All the data in the column will be lost.
  - The `completionConditions` column on the `Major` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `description` column on the `Major` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recruitmentConditions` column on the `Major` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `syllabus` column on the `Major` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Qualification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ContactPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MajorQualification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Qualification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,slug]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unitSlug` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Qualification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `Unit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `website` on table `Unit` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "MajorLevel" AS ENUM ('PIERWSZEGO_STOPNIA', 'DRUGIEGO_STOPNIA', 'JEDNOLITE_MAGISTERSKIE', 'PODYPLOMOWE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FINISHED', 'IN_PROGRESS', 'TO_CHECK');

-- CreateEnum
CREATE TYPE "QualificationType" AS ENUM ('OGOLNE', 'SPECJALISTYCZNE', 'ZAWODOWE', 'INNE');

-- DropForeignKey
ALTER TABLE "ContactPerson" DROP CONSTRAINT "ContactPerson_majorId_fkey";

-- DropForeignKey
ALTER TABLE "MajorQualification" DROP CONSTRAINT "MajorQualification_majorId_fkey";

-- DropForeignKey
ALTER TABLE "MajorQualification" DROP CONSTRAINT "MajorQualification_qualificationId_fkey";

-- DropForeignKey
ALTER TABLE "UnitAddress" DROP CONSTRAINT "UnitAddress_unitId_fkey";

-- AlterTable
ALTER TABLE "Major" DROP COLUMN "approvedOnlineStudy",
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "isRegulated" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "majorLevel" "MajorLevel" NOT NULL DEFAULT 'PODYPLOMOWE',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'IN_PROGRESS',
ADD COLUMN     "unitSlug" TEXT NOT NULL,
ALTER COLUMN "cost" DROP NOT NULL,
ALTER COLUMN "certificates" DROP NOT NULL,
ALTER COLUMN "certificates" SET DATA TYPE TEXT,
DROP COLUMN "completionConditions",
ADD COLUMN     "completionConditions" JSONB,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB,
ALTER COLUMN "formOfStudy" DROP NOT NULL,
ALTER COLUMN "numberOfSemesters" DROP NOT NULL,
ALTER COLUMN "organisator" DROP NOT NULL,
DROP COLUMN "recruitmentConditions",
ADD COLUMN     "recruitmentConditions" JSONB,
DROP COLUMN "syllabus",
ADD COLUMN     "syllabus" JSONB,
ALTER COLUMN "durationInHours" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Qualification" ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "QualificationType" NOT NULL DEFAULT 'OGOLNE';

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'IN_PROGRESS',
ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "website" SET NOT NULL;

-- AlterTable
ALTER TABLE "UnitAddress" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL;

-- DropTable
DROP TABLE "ContactPerson";

-- DropTable
DROP TABLE "MajorQualification";

-- DropEnum
DROP TYPE "MajorType";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UnitEmail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "sentBy" TEXT NOT NULL,
    "sentTo" TEXT[],
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "UnitEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MajorToQualification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_MajorToQualification_AB_unique" ON "_MajorToQualification"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorToQualification_B_index" ON "_MajorToQualification"("B");

-- CreateIndex
CREATE INDEX "Major_name_idx" ON "Major"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_slug_key" ON "Qualification"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_slug_key" ON "Unit"("slug");

-- CreateIndex
CREATE INDEX "Unit_name_slug_idx" ON "Unit"("name", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_id_slug_key" ON "Unit"("id", "slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitAddress" ADD CONSTRAINT "UnitAddress_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEmail" ADD CONSTRAINT "UnitEmail_sentBy_fkey" FOREIGN KEY ("sentBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEmail" ADD CONSTRAINT "UnitEmail_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToQualification" ADD CONSTRAINT "_MajorToQualification_A_fkey" FOREIGN KEY ("A") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToQualification" ADD CONSTRAINT "_MajorToQualification_B_fkey" FOREIGN KEY ("B") REFERENCES "Qualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
