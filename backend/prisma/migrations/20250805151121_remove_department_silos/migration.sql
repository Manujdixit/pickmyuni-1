/*
  Warnings:

  - The values [department] on the enum `CollegewiseContentSilos` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CollegewiseContentSilos_new" AS ENUM ('info', 'course', 'career', 'ranking', 'fees', 'scholarship', 'placement', 'news', 'faq', 'other', 'campus', 'accommodation', 'reviews', 'facilities');
ALTER TABLE "public"."CollegewiseContent" ALTER COLUMN "silos" DROP DEFAULT;
ALTER TABLE "public"."CollegewiseContent" ALTER COLUMN "silos" TYPE "public"."CollegewiseContentSilos_new" USING ("silos"::text::"public"."CollegewiseContentSilos_new");
ALTER TYPE "public"."CollegewiseContentSilos" RENAME TO "CollegewiseContentSilos_old";
ALTER TYPE "public"."CollegewiseContentSilos_new" RENAME TO "CollegewiseContentSilos";
DROP TYPE "public"."CollegewiseContentSilos_old";
ALTER TABLE "public"."CollegewiseContent" ALTER COLUMN "silos" SET DEFAULT 'info';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Colleges" ADD COLUMN     "rank" INTEGER;
