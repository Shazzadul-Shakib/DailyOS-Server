/*
  Warnings:

  - The `accountType` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccounType" AS ENUM ('PERSONAL', 'FAMILY');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType",
ADD COLUMN     "accountType" "AccounType" NOT NULL DEFAULT 'PERSONAL';
