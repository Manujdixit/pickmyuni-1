import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/:
 *   get:
 *     tags:
 *       - Colleges
 *     summary: Get all colleges
 *     description: Retrieve all colleges
 *     responses:
 *       200:
 *         description: Successfully retrieved all colleges
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Invalid college ID
 *       404:
 *         description: College not found or no universities found in this college
 */
export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const colleges = await prisma.colleges.findMany({
      select: {
        id: true,
        slug: true,
        is_parent: true,
        CollegewiseContent: {
          select: {
            silos: true,
            is_active: true,
          },
          where: {
            is_active: true,
            content: {
              not: "",
            },
          },
        },
      },
      where: {
        CollegewiseContent: {
          some: {
            is_active: true,
            content: {
              not: "",
            },
          },
        },
      },
    });

    // Transform the data to include available silos for each college
    const transformedColleges = colleges.map((college) => {
      const available_silos = college.CollegewiseContent
        ? college.CollegewiseContent.map((content) => content.silos)
        : [];

      return {
        id: college.id,
        slug: college.slug,
        is_parent: college.is_parent,
        available_silos,
      };
    });

    res.json({
      success: true,
      data: transformedColleges,
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
