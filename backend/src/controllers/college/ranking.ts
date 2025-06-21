import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/ranking/{id}:
 *   get:
 *     summary: Get college rankings information
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
export const getCollegeRankingsInfo = async (req: Request, res: Response) => {
  const collegeId = parseInt(req.params.id);

  if (isNaN(collegeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college ID",
    });
  }

  try {
    const [basic, rankings] = await Promise.all([
      prisma.colleges.findUnique({
        where: { id: collegeId },
      }),
      prisma.collegewiseContent.findFirst({
        where: { college_id: collegeId, silos: "ranking" },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    if (!basic) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        basic,
        rankings,
      },
    });
  } catch (error) {
    console.error("Error fetching college rankings info:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching rankings information",
      error: (error as Error).message,
    });
  }
};
