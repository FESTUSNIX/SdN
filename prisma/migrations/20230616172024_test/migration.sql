/*
  Warnings:

  - You are about to drop the `_MajorToMajorCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MajorToMajorCategory" DROP CONSTRAINT "_MajorToMajorCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_MajorToMajorCategory" DROP CONSTRAINT "_MajorToMajorCategory_B_fkey";

-- DropTable
DROP TABLE "_MajorToMajorCategory";

-- CreateTable
CREATE TABLE "CategoriesOnPosts" (
    "majorId" INTEGER NOT NULL,
    "majorCategoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("majorId","majorCategoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_majorCategoryId_fkey" FOREIGN KEY ("majorCategoryId") REFERENCES "MajorCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
