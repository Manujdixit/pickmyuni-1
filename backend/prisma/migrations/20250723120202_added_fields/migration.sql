-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "international_student_accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "min_fees_int" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "content" TEXT;
