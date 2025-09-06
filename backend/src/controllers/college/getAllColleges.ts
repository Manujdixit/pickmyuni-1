import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/:
 *   get:
 *     tags:
 *       - Colleges
 *     summary: Get all colleges
 *     description: Retrieve all colleges, optionally filtered by is_parent status
 *     parameters:
 *       - in: query
 *         name: is_parent
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter colleges by parent status. 'true' for universities, 'false' for campuses. If not provided, returns all colleges.
 *     responses:
 *       200:
 *         description: Successfully retrieved all colleges
 *       500:
 *         description: Internal server error
 */
export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const { is_parent } = req.query;

    let isParentFilter = {};
    if (is_parent === "true") {
      isParentFilter = { is_parent: true };
    } else if (is_parent === "false") {
      isParentFilter = {
        OR: [{ is_parent: false }, { is_parent: null }],
      };
    }

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
        is_active: true,
        ...isParentFilter,
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
