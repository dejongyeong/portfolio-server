/*
  Warnings:

  - You are about to drop the column `CoAuthors` on the `Publication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "CoAuthors",
ADD COLUMN     "coAuthors" TEXT[],
ADD COLUMN     "keywords" TEXT[];
