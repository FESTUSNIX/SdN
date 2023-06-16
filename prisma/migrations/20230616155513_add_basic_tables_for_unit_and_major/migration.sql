-- CreateEnum
CREATE TYPE "MajorType" AS ENUM ('OGOLNE', 'ZAWODOWE', 'SPECJALISTYCZNE');

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MajorType" NOT NULL,

    CONSTRAINT "MajorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MajorToMajorCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MajorToMajorCategory_AB_unique" ON "_MajorToMajorCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorToMajorCategory_B_index" ON "_MajorToMajorCategory"("B");

-- AddForeignKey
ALTER TABLE "_MajorToMajorCategory" ADD CONSTRAINT "_MajorToMajorCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToMajorCategory" ADD CONSTRAINT "_MajorToMajorCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "MajorCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
