/*
  Warnings:

  - You are about to drop the column `alreadyAnalysed` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "alreadyAnalysed",
ADD COLUMN     "statisticId" INTEGER;

-- CreateTable
CREATE TABLE "Statistic" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
