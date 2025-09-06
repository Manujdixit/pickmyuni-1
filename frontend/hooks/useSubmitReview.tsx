import { useState } from "react";

export interface ReviewData {
  userId: number;
  collegeId?: number;
  courseId?: number;
  collegeLocation?: string;
  passYear?: number;
  reviewTitle?: string;
  linkedinProfile?: string;
  annualTuitionFees?: number;
  hostelFees?: number;
  otherCharges?: number;
  scholarshipAvailed?: boolean;
  scholarshipName?: string;
  scholarshipAmount?: number;
  overallSatisfactionRating?: number;
  overallExperienceFeedback?: string;
  teachingQualityRating?: number;
  teachingQualityFeedback?: string;
  infrastructureRating?: number;
  infrastructureFeedback?: string;
  libraryRating?: number;
  libraryFeedback?: string;
  placementSupportRating?: number;
  placementSupportFeedback?: string;
  administrativeSupportRating?: number;
  administrativeSupportFeedback?: string;
  hostelRating?: number;
  hostelFeedback?: string;
  extracurricularRating?: number;
  extracurricularFeedback?: string;
  improvementSuggestions?: string;
}

export interface FilesData {
  degree_certificate?: File;
  mark_sheet?: File;
  student_id?: File;
  college_images?: File[];
}

export interface ReviewResponse {
  id: number;
  user_id: number;
  custom_code?: string;
  college_id?: number;
  course_id?: number;
  review_title?: string;
  overall_satisfaction_rating?: number;
  status: string;
  reward_status: string;
  created_at: string;
  updated_at: string;
  degree_certificate_url?: string;
  mark_sheet_url?: string;
  student_id_url?: string;
  college_images_urls: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  custom_code?: string;
}

export const useSubmitReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReviewAsync = async (
    reviewData: ReviewData,
    files?: FilesData,
  ): Promise<ApiResponse<ReviewResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Map camelCase fields to snake_case for database
      const fieldMappings: { [key: string]: string } = {
        userId: "user_id",
        collegeId: "college_id",
        courseId: "course_id",
        collegeLocation: "college_location",
        passYear: "pass_year",
        reviewTitle: "review_title",
        linkedinProfile: "linkedin_profile",
        annualTuitionFees: "annual_tuition_fees",
        hostelFees: "hostel_fees",
        otherCharges: "other_charges",
        scholarshipAvailed: "scholarship_availed",
        scholarshipName: "scholarship_name",
        scholarshipAmount: "scholarship_amount",
        overallSatisfactionRating: "overall_satisfaction_rating",
        overallExperienceFeedback: "overall_experience_feedback",
        teachingQualityRating: "teaching_quality_rating",
        teachingQualityFeedback: "teaching_quality_feedback",
        infrastructureRating: "infrastructure_rating",
        infrastructureFeedback: "infrastructure_feedback",
        libraryRating: "library_rating",
        libraryFeedback: "library_feedback",
        placementSupportRating: "placement_support_rating",
        placementSupportFeedback: "placement_support_feedback",
        administrativeSupportRating: "administrative_support_rating",
        administrativeSupportFeedback: "administrative_support_feedback",
        hostelRating: "hostel_rating",
        hostelFeedback: "hostel_feedback",
        extracurricularRating: "extracurricular_rating",
        extracurricularFeedback: "extracurricular_feedback",
        improvementSuggestions: "improvement_suggestions",
      };

      // Add all review data with proper database field names
      Object.entries(reviewData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const dbFieldName = fieldMappings[key] || key;
          formData.append(dbFieldName, value.toString());
        }
      });

      // Add files if provided
      if (files) {
        if (files.degree_certificate) {
          formData.append("degree_certificate", files.degree_certificate);
        }
        if (files.mark_sheet) {
          formData.append("mark_sheet", files.mark_sheet);
        }
        if (files.student_id) {
          formData.append("student_id", files.student_id);
        }
        if (files.college_images && files.college_images.length > 0) {
          files.college_images.forEach((file, index) => {
            formData.append("college_images", file);
          });
        }

        formData.delete("collegeImages");
      }

      formData.delete("studentId");
      formData.delete("markSheet");
      formData.delete("degreeCertificate");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`,
        {
          method: "POST",
          body: formData, // No Content-Type header needed for FormData
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit review";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitReviewAsync,
    isLoading,
    error,
  };
};
