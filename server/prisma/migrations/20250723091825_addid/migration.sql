/*
  Warnings:

  - You are about to drop the column `googleProvided` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleProvided",
ADD COLUMN     "googleId" TEXT;
