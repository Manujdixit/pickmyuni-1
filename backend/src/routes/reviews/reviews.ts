import { Router } from "express";
import multer from "multer";
import { ReviewsController } from "../../controllers/reviews/reviews";

const router = Router();
const reviewsController = new ReviewsController();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory for processing
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10, // Maximum 10 files
  },
});

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Review management endpoints
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review with file uploads
 *     tags: [Reviews]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               college_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *               college_location:
 *                 type: string
 *               pass_year:
 *                 type: integer
 *               review_title:
 *                 type: string
 *               linkedin_profile:
 *                 type: string
 *               annual_tuition_fees:
 *                 type: number
 *               hostel_fees:
 *                 type: number
 *               other_charges:
 *                 type: number
 *               scholarship_availed:
 *                 type: boolean
 *               scholarship_name:
 *                 type: string
 *               scholarship_amount:
 *                 type: number
 *               overall_satisfaction_rating:
 *                 type: integer
 *               overall_experience_feedback:
 *                 type: string
 *               teaching_quality_rating:
 *                 type: integer
 *               teaching_quality_feedback:
 *                 type: string
 *               infrastructure_rating:
 *                 type: integer
 *               infrastructure_feedback:
 *                 type: string
 *               library_rating:
 *                 type: integer
 *               library_feedback:
 *                 type: string
 *               placement_support_rating:
 *                 type: integer
 *               placement_support_feedback:
 *                 type: string
 *               administrative_support_rating:
 *                 type: integer
 *               administrative_support_feedback:
 *                 type: string
 *               hostel_rating:
 *                 type: integer
 *               hostel_feedback:
 *                 type: string
 *               extracurricular_rating:
 *                 type: integer
 *               extracurricular_feedback:
 *                 type: string
 *               improvement_suggestions:
 *                 type: string
 *               degree_certificate:
 *                 type: string
 *                 format: binary
 *               mark_sheet:
 *                 type: string
 *                 format: binary
 *               student_id:
 *                 type: string
 *                 format: binary
 *               college_images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 */

router.post(
  "/",
  upload.fields([
    { name: "degree_certificate", maxCount: 1 },
    { name: "mark_sheet", maxCount: 1 },
    { name: "student_id", maxCount: 1 },
    { name: "college_images", maxCount: 5 }, // Allow up to 5 college images
  ]),
  reviewsController.createReview.bind(reviewsController)
);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get("/:id", reviewsController.getReviewById.bind(reviewsController));

/**
 * @swagger
 * /reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by user ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
router.get(
  "/user/:userId",
  reviewsController.getReviewsByUserId.bind(reviewsController)
);

export default router;
