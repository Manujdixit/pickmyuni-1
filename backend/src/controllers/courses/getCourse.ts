import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/courses/single:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get course
 *     description: Retrieve  course
 *     responses:
 *       200:
 *         description: Successfully retrieved  course
 *       500:
 *         description: Internal server error
 */
export const getCourse = async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    const courses = await prisma.collegesCourses.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      success: true,
      data: courses,
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
