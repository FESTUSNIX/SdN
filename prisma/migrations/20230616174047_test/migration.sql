/*
  Warnings:

  - You are about to drop the `CategoriesOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_majorCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_majorId_fkey";

-- DropTable
DROP TABLE "CategoriesOnPosts";

-- CreateTable
CREATE TABLE "_MyRelationTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MyRelationTable_AB_unique" ON "_MyRelationTable"("A", "B");

-- CreateIndex
CREATE INDEX "_MyRelationTable_B_index" ON "_MyRelationTable"("B");

-- AddForeignKey
ALTER TABLE "_MyRelationTable" ADD CONSTRAINT "_MyRelationTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MyRelationTable" ADD CONSTRAINT "_MyRelationTable_B_fkey" FOREIGN KEY ("B") REFERENCES "MajorCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
