import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/{id}:
 *   get:
 *     summary: Get college by ID with complete data
 *     tags: [Colleges]
 *     description: Retrieve a specific college by ID with all related information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: College ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved college
 *       400:
 *         description: Invalid college ID
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const collegeId = parseInt(req.params.id);

    if (isNaN(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID",
      });
    }

    const college = await prisma.colleges.findUnique({
      where: { id: collegeId },
      select: {
        id: true,
        slug: true,
        logo_url: true,
        college_name: true,
        bg_url: true,
        location: true,
        address: true,
        total_students: true,
        international_student_rate: true,
        parent_college_id: true,
        is_parent: true,
        acceptance_rate: true,
        _count: {
          select: {
            CollegesCourses: true,
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

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching college",
      error: (error as Error).message,
    });
  }
};
