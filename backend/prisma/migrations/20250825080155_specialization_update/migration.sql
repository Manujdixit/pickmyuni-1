/*
  Warnings:

  - The primary key for the `Specialization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sp_id` on the `Specialization` table. All the data in the column will be lost.
  - You are about to drop the column `sp_name` on the `Specialization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Specialization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Specialization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Specialization" DROP CONSTRAINT "Specialization_pkey",
DROP COLUMN "sp_id",
DROP COLUMN "sp_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_slug_key" ON "public"."Specialization"("slug");
