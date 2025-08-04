import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/facilities/{id}:
 *   get:
 *     summary: Get college facilites information
 *     tags: [Colleges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integerFInfo
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
export const getCollegeFacilitiesInfo = async (req: Request, res: Response) => {
  const collegeId = parseInt(req.params.id);

  if (isNaN(collegeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college ID",
    });
  }

  try {
    const [basic, facilites] = await Promise.all([
      prisma.colleges.findUnique({
        where: { id: collegeId },
      }),
      prisma.collegewiseContent.findFirst({
        where: { college_id: collegeId, silos: "facilities" },
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
        facilites,
      },
    });
  } catch (error) {
    console.error("Error fetching college facilites info:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching facilites information",
      error: (error as Error).message,
    });
  }
};
