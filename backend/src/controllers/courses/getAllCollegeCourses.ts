import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/courses/all:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all college courses with college slug and id
 *     description: Retrieve  course
 *     responses:
 *       200:
 *         description: Successfully retrieved  course
 *       500:
 *         description: Internal server error
 */
export const getAllCollegeCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.$queryRaw<
      Array<{
        id: number;
        name: string;
        college_id: number;
        college_name: string;
        college_slug: string;
      }>
    >`
      SELECT 
        cc.id as id,
        cc.name as name,
        c.id as college_id,
        c.college_name as college_name,
        c.slug as college_slug
      FROM "CollegesCourses" cc
      JOIN "Colleges" c ON cc.college_id = c.id
    `;

    // Transform the raw result to match the expected structure
    const transformedCourses = courses.map((course) => ({
      id: course.id,
      name: course.name,
      college: {
        id: course.college_id,
        name: course.college_name,
        slug: course.college_slug,
      },
    }));

    res.json({
      success: true,
      data: transformedCourses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
