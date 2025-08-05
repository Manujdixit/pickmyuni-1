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

    // Input validation
    if (!college_id) {
      return res.status(400).json({
        success: false,
        message: "college_id is required",
      });
    }

    const collegeIdNum = Number(college_id);
    const courseIdNum = course_id ? Number(course_id) : null;

    // Validate numeric inputs
    if (isNaN(collegeIdNum) || (course_id && isNaN(courseIdNum!))) {
      return res.status(400).json({
        success: false,
        message: "Invalid college_id or course_id format",
      });
    }

    let college, totalCoursesCount;

    if (courseIdNum) {
      // Case 1: Specific course requested - need separate queries for efficiency
      const [collegeData, coursesCount] = await Promise.all([
        prisma.colleges.findUnique({
          where: {
            id: collegeIdNum,
            is_active: true,
          },
          include: {
            CollegesCourses: {
              where: {
                is_active: true,
                id: courseIdNum,
              },
              select: {
                id: true,
                name: true,
                level: true,
                tution_fees: true,
                domestic_fees_in_aud: true,
                duration_in_months: true,
                one_time_fees: true,
                hostel_fees: true,
              },
            },
          },
        }),
        prisma.collegesCourses.count({
          where: {
            college_id: collegeIdNum,
            is_active: true,
          },
        }),
      ]);

      college = collegeData;
      totalCoursesCount = coursesCount;
    } else {
      // Case 2: All courses requested - single query is more efficient
      college = await prisma.colleges.findUnique({
        where: {
          id: collegeIdNum,
          is_active: true,
        },
        include: {
          CollegesCourses: {
            where: {
              is_active: true,
            },
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      totalCoursesCount = college?.CollegesCourses.length || 0;
    }

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found or inactive",
      });
    }

    // If specific course_id was provided but course not found
    if (courseIdNum && college.CollegesCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found for this college or inactive",
      });
    }

    // Add total courses count to response
    const response = {
      ...college,
      coursesCount: totalCoursesCount,
    };

    return res.status(200).json({
      success: true,
      data: {
        college: response,
      },
    });
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
