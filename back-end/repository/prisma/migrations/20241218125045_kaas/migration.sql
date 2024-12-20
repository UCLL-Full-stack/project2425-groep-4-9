/*
  Warnings:

  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- DropIndex
DROP INDEX "User_teamId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
