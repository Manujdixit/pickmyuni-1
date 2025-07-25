import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { tagSanatize } from "../../utils/tagsanatize";

/**
 * @swagger
 * /api/v1/college/top:
 *   get:
 *     summary: Get top colleges with optional stream filter and also returns all streams
 *     tags: [Colleges]
 *     description: Retrieve a list of top-ranked colleges
 *     parameters:
 *       - in: query
 *         name: stream
 *         required: false
 *         description: Optional parameter to filter colleges by stream name (Engineering, Management, Design, Law)
 *         schema:
 *           type: string
 *           example: "engineering"
 *     responses:
 *       200:
 *         description: Successfully retrieved top colleges
 *       500:
 *         description: Internal server error
 */
export const getTopColleges = async (req: Request, res: Response) => {
  try {
    const { stream } = req.query;

    // Build the where clause conditionally
    const whereClause: any = {};

    if (stream) {
      whereClause.primary_stream = {
        name: {
          equals: String(stream),
          mode: "insensitive",
        },
      };
    }

    whereClause.is_active = true;

    const [colleges, streams] = await Promise.all([
      prisma.colleges.findMany({
        where: whereClause,
        select: {
          id: true,
          logo_url: true,
          college_name: true,
          slug: true,
          avg_fees_in_aud: true,
          level: true,
          type: true,
          intake: true,
          location: true,
          score: true,
          _count: {
            select: {
              CollegesCourses: true,
            },
          },
        },
        orderBy: {
          score: "desc",
        },
        take: 6,
      }),
      prisma.stream.findMany({
        where: { Colleges: { some: {} } },
        select: { id: true, name: true },
        orderBy: { score: "desc" },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        colleges: colleges.map((college: any) => ({
          ...college,
          slug: tagSanatize(college.slug),
        })),
        streams: [
          { id: 0, name: "All" },
          ...streams.map((stream: any) => ({
            id: stream.id,
            name: stream.name,
          })),
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching top colleges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
