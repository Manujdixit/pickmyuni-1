import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { S3 } from "aws-sdk";

// Create review with file upload support
export class ReviewsController {
  async createReview(req: Request, res: Response) {
    try {
      const body = req.body;
      const files = req.files as any;

      // --- File uploads ---
      const reviewData: any = { ...body };

      if (files) {
        if (files.degree_certificate?.[0]) {
          reviewData.degree_certificate_url = await this.uploadFile(
            files.degree_certificate[0],
            "test(can delete)",
            body.user_id
          );
        }

        if (files.mark_sheet?.[0]) {
          reviewData.mark_sheet_url = await this.uploadFile(
            files.mark_sheet[0],
            "test(can delete)",
            body.user_id
          );
        }

        if (files.student_id?.[0]) {
          reviewData.student_id_url = await this.uploadFile(
            files.student_id[0],
            "test(can delete)",
            body.user_id
          );
        }

        //delete student_id from reviewData
        delete reviewData.student_id;

        if (files.college_images?.length > 0) {
          reviewData.college_images_urls = await Promise.all(
            files.college_images.map((file: Express.Multer.File) =>
              this.uploadFile(file, "test(can delete)", body.user_id)
            )
          );
        }
      }

      // --- Type conversions ---
      const intFields = ["pass_year", "college_id", "course_id", "user_id"];
      intFields.forEach((field) => {
        if (reviewData[field]) reviewData[field] = parseInt(reviewData[field]);
      });

      const ratingFields = [
        "overall_satisfaction_rating",
        "teaching_quality_rating",
        "infrastructure_rating",
        "library_rating",
        "placement_support_rating",
        "administrative_support_rating",
        "hostel_rating",
        "extracurricular_rating",
      ];
      ratingFields.forEach((field) => {
        if (reviewData[field]) reviewData[field] = parseInt(reviewData[field]);
      });

      const decimalFields = [
        "annual_tuition_fees",
        "hostel_fees",
        "other_charges",
        "scholarship_amount",
      ];
      decimalFields.forEach((field) => {
        if (reviewData[field])
          reviewData[field] = parseFloat(reviewData[field]);
      });

      if (reviewData.scholarship_availed === "true")
        reviewData.scholarship_availed = true;
      if (reviewData.scholarship_availed === "false")
        reviewData.scholarship_availed = false;

      // --- Prisma create ---
      const { user_id, ...rest } = reviewData;

      const review = await prisma.review.create({
        data: {
          ...rest,
          user: user_id ? { connect: { id: user_id } } : undefined,
        },
        include: {
          user: {
            select: {
              custom_code: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get review by ID
  async getReviewById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const review = await prisma.review.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              custom_code: true,
              contact_number: true,
            },
          },
        },
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      console.error("Error fetching review:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get reviews by user ID
  async getReviewsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const reviews = await prisma.review.findMany({
        where: { user_id: parseInt(userId) },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              custom_code: true,
            },
          },
        },
        orderBy: { created_at: "desc" },
      });

      return res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // AWS S3 File upload helper method
  private async uploadFile(
    file: any,
    folder: string,
    userId: number
  ): Promise<string> {
    try {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const timestamp = Date.now();
      const sanitizedFileName = file.originalname.replace(
        /[^a-zA-Z0-9.\-_]/g,
        "_"
      );
      const key = `${folder}/${userId}/${timestamp}_${sanitizedFileName}.${
        file.mimetype.split("/")[1]
      }`;

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read", // Makes file publicly accessible
      };

      const result = await s3.upload(uploadParams).promise();

      return result.Location; // Returns the public URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error(`Failed to upload file: ${error}`);
    }
  }
}
