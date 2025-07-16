/*
  Warnings:

  - You are about to drop the column `created_at` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `table_id` on the `UserTable` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserTable` table. All the data in the column will be lost.
  - Added the required column `mestreId` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sistema` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `UserTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserTable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVA', 'RECRUTANDO', 'PAUSADA');

-- DropForeignKey
ALTER TABLE "UserTable" DROP CONSTRAINT "UserTable_table_id_fkey";

-- DropForeignKey
ALTER TABLE "UserTable" DROP CONSTRAINT "UserTable_user_id_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "created_at",
DROP COLUMN "name",
ADD COLUMN     "ambientacao" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imagemUrl" TEXT,
ADD COLUMN     "jogadores" TEXT,
ADD COLUMN     "mestreId" TEXT NOT NULL,
ADD COLUMN     "sistema" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserTable" DROP COLUMN "table_id",
DROP COLUMN "user_id",
ADD COLUMN     "tableId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_mestreId_fkey" FOREIGN KEY ("mestreId") REFERENCES "UserTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTable" ADD CONSTRAINT "UserTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTable" ADD CONSTRAINT "UserTable_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
