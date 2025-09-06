-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "custom_code" TEXT,
    "name" TEXT,
    "email" TEXT,
    "gender" TEXT,
    "contact_number" TEXT,
    "country_of_origin" TEXT,
    "college_roll_number" TEXT,
    "user_location" TEXT,
    "dob" TIMESTAMP(3),
    "user_type" TEXT,
    "user_img_url" TEXT,
    "password" TEXT,
    "referrer_id" INTEGER,
    "referred_by" TEXT,
    "college" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "college_id" INTEGER,
    "course_id" INTEGER,
    "college_location" TEXT,
    "pass_year" INTEGER,
    "linkedin_profile" TEXT,
    "student_id_url" TEXT,
    "mark_sheet_url" TEXT,
    "degree_certificate_url" TEXT,
    "review_title" TEXT,
    "college_images_urls" TEXT[],
    "annual_tuition_fees" DECIMAL(10,2),
    "hostel_fees" DECIMAL(10,2),
    "other_charges" DECIMAL(10,2),
    "scholarship_availed" BOOLEAN,
    "scholarship_name" TEXT,
    "scholarship_amount" DECIMAL(10,2),
    "overall_satisfaction_rating" INTEGER,
    "overall_experience_feedback" TEXT,
    "teaching_quality_rating" INTEGER,
    "teaching_quality_feedback" TEXT,
    "infrastructure_rating" INTEGER,
    "infrastructure_feedback" TEXT,
    "library_rating" INTEGER,
    "library_feedback" TEXT,
    "placement_support_rating" INTEGER,
    "placement_support_feedback" TEXT,
    "administrative_support_rating" INTEGER,
    "administrative_support_feedback" TEXT,
    "hostel_rating" INTEGER,
    "hostel_feedback" TEXT,
    "extracurricular_rating" INTEGER,
    "extracurricular_feedback" TEXT,
    "improvement_suggestions" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reward_status" TEXT NOT NULL DEFAULT 'pending',
    "user_id" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_custom_code_key" ON "public"."User"("custom_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_number_key" ON "public"."User"("contact_number");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_contact_number_idx" ON "public"."User"("contact_number");

-- CreateIndex
CREATE INDEX "User_custom_code_idx" ON "public"."User"("custom_code");

-- CreateIndex
CREATE INDEX "Review_user_id_idx" ON "public"."Review"("user_id");

-- CreateIndex
CREATE INDEX "Review_status_idx" ON "public"."Review"("status");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
