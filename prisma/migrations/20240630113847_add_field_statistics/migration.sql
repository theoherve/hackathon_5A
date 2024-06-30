/*
  Warnings:

  - Added the required column `statistics` to the `Statistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistic" ADD COLUMN     "statistics" TEXT NOT NULL;
