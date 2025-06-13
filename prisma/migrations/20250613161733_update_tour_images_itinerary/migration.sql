/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "imageUrl",
ADD COLUMN     "images" JSONB NOT NULL DEFAULT '[]';
