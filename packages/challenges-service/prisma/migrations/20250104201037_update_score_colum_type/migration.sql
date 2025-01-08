/*
  Warnings:

  - You are about to alter the column `score` on the `Submission` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;
