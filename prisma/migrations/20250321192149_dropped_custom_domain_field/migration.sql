/*
  Warnings:

  - You are about to drop the column `customDomain` on the `Site` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Site_customDomain_key";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "customDomain";
