import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/courses/{id}:
 *   get:
 *     summary: Get related courses
 *     tags: [Colleges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid college ID
 *       404:
 *         description: College not found
 *       500:
 *         description: Server error
 */
export const relatedCourses = async (req: Request, res: Response) => {
  const collegeId = parseInt(req.params.id);

  if (isNaN(collegeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college ID",
    });
  }

  try {
    const relatedCourses = await prisma.collegesCourses.findMany({
      where: {
        college_id: collegeId,
      },
      select: {
        id: true,
        name: true,
        duration_in_months: true,
        tution_fees: true,
        hostel_fees: true,
        other_fees: true,
        level: true,
      },
    });

    res.status(200).json({
      success: true,
      data: relatedCourses,
    });
  } catch (error) {
    console.error("Error fetching related courses:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching related courses",
      error: (error as Error).message,
    });
  }
};
