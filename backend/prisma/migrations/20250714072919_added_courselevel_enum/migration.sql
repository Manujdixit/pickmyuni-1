-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CourseLevel" ADD VALUE 'graduate_certificate';
ALTER TYPE "CourseLevel" ADD VALUE 'post_graduate_certificate';
ALTER TYPE "CourseLevel" ADD VALUE 'graduate_diploma';
ALTER TYPE "CourseLevel" ADD VALUE 'post_graduate_diploma';
ALTER TYPE "CourseLevel" ADD VALUE 'elicos';
ALTER TYPE "CourseLevel" ADD VALUE 'associate_degree';
ALTER TYPE "CourseLevel" ADD VALUE 'advanced_diploma';
