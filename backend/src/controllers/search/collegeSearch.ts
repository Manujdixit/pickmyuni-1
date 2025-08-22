import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/search/colleges:
 *   get:
 *     summary: Search for colleges
 *     tags: [Search]
 *     description: Search across colleges using a query parameter
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search query string
 *         schema:
 *           type: string
 *           example: "engineering"
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *       400:
 *         description: Bad request - missing or invalid query parameter
 *       500:
 *         description: Internal server error
 */
export const collegeSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Search in all three entities in parallel
    const [colleges] = await Promise.all([
      prisma.colleges.findMany({
        where: {
          OR: [
            { college_name: { contains: q, mode: "insensitive" } },
            { location: { contains: q, mode: "insensitive" } },
            { search_names: { contains: q, mode: "insensitive" } },
          ],
          AND: [{ is_active: true }],
        },
        select: {
          id: true,
          college_name: true,
          slug: true,
          location: true,
          rating: true,
        },
        orderBy: {
          score: "desc",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        colleges,
      },
    });
  } catch (error) {
    console.error("Error performing global search:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while performing search",
      error: (error as Error).message,
    });
  }
};
