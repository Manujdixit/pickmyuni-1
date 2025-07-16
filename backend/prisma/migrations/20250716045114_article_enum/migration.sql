-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ArticlesSilos" ADD VALUE 'universities';
ALTER TYPE "ArticlesSilos" ADD VALUE 'fees_scholarships_and_costs';
ALTER TYPE "ArticlesSilos" ADD VALUE 'international_student_essentials';
ALTER TYPE "ArticlesSilos" ADD VALUE 'transfers_and_migration_advice';
ALTER TYPE "ArticlesSilos" ADD VALUE 'application_admissions_and_compliance';
