-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "domestic_fees_in_aud" DOUBLE PRECISION,
ADD COLUMN     "is_parent" BOOLEAN;

-- AlterTable
ALTER TABLE "CollegesCourses" ADD COLUMN     "domestic_fees_in_aud" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Courses_slug_idx" ON "Courses"("slug");

-- CreateIndex
CREATE INDEX "State_slug_idx" ON "State"("slug");

-- CreateIndex
CREATE INDEX "Stream_slug_idx" ON "Stream"("slug");
