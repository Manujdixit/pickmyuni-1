-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('government', 'private', 'other');

-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "intake" TEXT,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "type" "CollegeType" NOT NULL DEFAULT 'other';
