-- CreateEnum
CREATE TYPE "dificuldade" AS ENUM ('Iniciante', 'Intermediário', 'Avançado');

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "dificuldade" TEXT;
