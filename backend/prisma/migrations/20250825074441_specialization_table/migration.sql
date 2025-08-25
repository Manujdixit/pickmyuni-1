-- CreateTable
CREATE TABLE "public"."Specialization" (
    "sp_id" SERIAL NOT NULL,
    "sp_name" TEXT NOT NULL,
    "content" TEXT,
    "duration_in_weeks" INTEGER,
    "rating" DOUBLE PRECISION,
    "score" INTEGER NOT NULL DEFAULT 1,
    "banner_img" TEXT,
    "img1" TEXT,
    "img2" TEXT,
    "slug" TEXT,
    "type" TEXT,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "streamId" INTEGER,
    "course_id" INTEGER,
    "meta_desc" TEXT,
    "og_img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("sp_id")
);

-- AddForeignKey
ALTER TABLE "public"."Specialization" ADD CONSTRAINT "Specialization_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Specialization" ADD CONSTRAINT "Specialization_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
