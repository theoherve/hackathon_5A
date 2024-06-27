/*
  Warnings:

  - You are about to drop the column `idActive` on the `Service` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "idActive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;
