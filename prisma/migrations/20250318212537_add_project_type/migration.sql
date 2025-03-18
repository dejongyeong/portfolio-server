/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image",
DROP COLUMN "preview",
ADD COLUMN     "imageLink" TEXT,
ADD COLUMN     "previewLink" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'personal';
