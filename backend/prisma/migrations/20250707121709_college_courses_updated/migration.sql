/*
  Warnings:

  - Added the required column `level` to the `CollegesCourses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('diploma', 'bachelor', 'master', 'doctorate', 'certificate', 'other');

-- AlterTable
ALTER TABLE "CollegesCourses" ADD COLUMN     "content" TEXT,
ADD COLUMN     "level" "CourseLevel" NOT NULL;
