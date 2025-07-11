import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/compare:
 *   get:
 *     summary: Compare colleges by ID
 *     tags: [Colleges]
 *     description: Compare colleges by ID
 *     parameters:
 *       - in: query
 *         name: c1
 *         required: true
 *         description: First college ID
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
    const { c1 } = req.query;

    if (!c1) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const college = await prisma.colleges.findUnique({
      where: {
        id: Number(c1),
      },
      include: {
        CollegesCourses: true,
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
      data: {
        college: college,
      },
    });
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
