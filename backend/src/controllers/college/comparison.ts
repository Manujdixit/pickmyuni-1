import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/compare:
 *   get:
 *     summary: Compare colleges by ID or course ID
 *     tags: [Colleges, Courses]
 *     description: Compare colleges by ID or course ID
 *     parameters:
 *       - in: query
 *         name: college_id
 *         required: false
 *         description: College ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: course_id
 *         required: false
 *         description: Course ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved college
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
export const compareColleges = async (req: Request, res: Response) => {
  try {
    const { college_id, course_id } = req.query;

    if (!college_id && !course_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide college_id or course_id",
      });
    }

    if (college_id && !course_id) {
      // Return the college and its distinct courses (not CollegesCourses)
      const collegeWithCourses = await prisma.colleges.findUnique({
        where: {
          id: Number(college_id),
        },
        include: {
          CollegesCourses: true,
        },
      });
      if (!collegeWithCourses) {
        return res.status(404).json({
          success: false,
          message: "College not found",
        });
      }

      // // Remove CollegesCourses from college object
      // const { CollegesCourses, ...college } = collegeWithCourses;
      res.status(200).json({
        success: true,
        data: {
          college: collegeWithCourses,
        },
      });
    }

    if (college_id && course_id) {
      const college = await prisma.colleges.findUnique({
        where: {
          id: Number(college_id),
        },
        include: {
          CollegesCourses: {
            where: {
              id: Number(course_id),
            },
          },
        },
      });

      if (!college) {
        return res.status(404).json({
          success: false,
          message: "College not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          college: college,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
