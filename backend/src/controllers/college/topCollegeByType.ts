import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { tagSanatize } from "../../utils/tagsanatize";

/**
 * @swagger
 * /api/v1/college/top-type:
 *   get:
 *     summary: Get top colleges by type
 *     description: Returns the top 10 colleges filtered by type and ordered by score.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: The type of college to filter by
 *     responses:
 *       200:
 *         description: A list of top colleges
 *       500:
 *         description: Internal server error
 */
export const getTopCollegesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    // Build the where clause conditionally
    const whereClause: any = {};

    if (type) {
      whereClause.type = {
        equals: String(type),
      };
    }

    whereClause.is_active = true;

    const [colleges] = await Promise.all([
      prisma.colleges.findMany({
        where: whereClause,
        select: {
          id: true,
          logo_url: true,
          college_name: true,
          slug: true,
          bg_url: true,
        },
        orderBy: {
          score: "desc",
        },
        take: 10,
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        colleges: colleges.map((college: any) => ({
          ...college,
          slug: tagSanatize(college.slug),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching top colleges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
