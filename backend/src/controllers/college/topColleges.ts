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
          // avg_fees_in_aud: true,
          level: true,
          type: true,
          intake: true,
          location: true,
          score: true,
          // domestic_fees_in_aud: true,
          CollegesCourses: {
            where: { is_active: true },
            select: {
              domestic_fees_in_aud: true,
              tution_fees: true,
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
        select: { id: true, name: true, slug: true },
        orderBy: { score: "desc" },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        colleges: colleges.map((college) => {
          const coursesCount = college.CollegesCourses.length;
          // Calculate minimum tuition fees
          const domesticFees = college.CollegesCourses.map(
            (course: any) => course.domestic_fees_in_aud
          ).filter((fee: any) => fee !== null && fee !== undefined);
          const internationalFees = college.CollegesCourses.map(
            (course: any) => course.tution_fees
          ).filter((fee: any) => fee !== null && fee !== undefined);

          const min_tution_fee_domestic =
            domesticFees.length > 0 ? Math.min(...domesticFees) : null;
          const min_tution_fee_int =
            internationalFees.length > 0
              ? Math.min(...internationalFees)
              : null;

          const { CollegesCourses, ...collegeWithoutCourses } = college;
          return {
            ...collegeWithoutCourses,
            slug: tagSanatize(college.slug),
            coursesCount,
            min_tution_fee_domestic,
            min_tution_fee_int,
          };
        }),
        streams: [
          { id: 0, name: "All" },
          ...streams.map((stream: any) => ({
            id: stream.id,
            name: stream.name,
            slug: tagSanatize(stream.slug),
          })),
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching top colleges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
