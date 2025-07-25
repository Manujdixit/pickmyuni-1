import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/{id}/banner:
 *   get:
 *     summary: Get college banner URL by ID
 *     tags: [Colleges]
 *     description: Retrieve a specific college's banner image URL by ID
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
 *         description: Successfully retrieved college banner URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     bg_url:
 *                       type: string
 *                       format: url
 *       400:
 *         description: Invalid college ID
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
export const getCollegeBanner = async (req: Request, res: Response) => {
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
        bg_url: true,
        slug: true,
        logo_url: true,
        college_name: true,
        location: true,
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
    console.error("Error fetching college banner by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching college banner",
      error: (error as Error).message,
    });
  }
};
