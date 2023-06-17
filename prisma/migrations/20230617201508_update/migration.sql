/*
  Warnings:

  - You are about to drop the column `postalCode` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `costs` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `onlineHours` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `coordinates` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `durationInHours` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "postalCode";

-- AlterTable
ALTER TABLE "Major" DROP COLUMN "costs",
DROP COLUMN "duration",
DROP COLUMN "onlineHours",
ADD COLUMN     "canPayInInstallments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "durationInHours" INTEGER NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onlineDuration" INTEGER,
ALTER COLUMN "completionConditions" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "formOfStudy" SET DEFAULT 'zaoczne',
ALTER COLUMN "recruitmentConditions" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "syllabus" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "coordinates",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "nip" DROP NOT NULL,
ALTER COLUMN "regon" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;
