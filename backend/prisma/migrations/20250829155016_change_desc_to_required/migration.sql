/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "ai_description" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
