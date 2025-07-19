/*
  Warnings:

  - You are about to drop the column `mestreId` on the `Table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_mestreId_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "mestreId";

-- AlterTable
ALTER TABLE "UserTable" ADD COLUMN     "isGm" BOOLEAN NOT NULL DEFAULT false;
