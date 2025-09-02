-- AlterTable
ALTER TABLE "public"."Articles" ADD COLUMN     "metatitle" TEXT;

-- AlterTable
ALTER TABLE "public"."Colleges" ADD COLUMN     "is_affordable" BOOLEAN DEFAULT false,
ADD COLUMN     "is_open" BOOLEAN DEFAULT false;
