import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/college/suggest/{id}:
 *   get:
 *     summary: Get suggested colleges
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
export const suggestedColleges = async (req: Request, res: Response) => {
  const parent_college_id = parseInt(req.params.id);

  if (isNaN(parent_college_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college ID",
    });
  }

  try {
    const [colleges, campus] = await Promise.all([
      prisma.colleges.findMany({
        where: { parent_college_id: parent_college_id },
        select: {
          id: true,
          slug: true,
          logo_url: true,
          college_name: true,
          location: true,
          rating: true,
          score: true,
          brochure_url: true,
          avg_fees_in_aud: true,
          city: { select: { name: true } },
          state: { select: { name: true } },
          rank: true,
          CollegesCourses: {
            where: { is_active: true },
            select: {
              domestic_fees_in_aud: true,
              tution_fees: true,
            },
          },
        },
      }),
      prisma.collegewiseContent.findFirst({
        where: { college_id: parent_college_id, silos: "campus" },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    // Transform data to include course_count and flatten city/state names
    const collegeList = colleges.map((college) => {
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
        internationalFees.length > 0 ? Math.min(...internationalFees) : null;

      return {
        id: college.id,
        slug: college.slug,
        logo_url: college.logo_url,
        college_name: college.college_name,
        location: college.location,
        rating: college.rating,
        score: college.score,
        brochure_url: college.brochure_url,
        avg_fees_in_aud: college.avg_fees_in_aud,
        city_name: college.city?.name,
        state_name: college.state?.name,
        course_count: coursesCount,
        min_tution_fee_domestic,
        min_tution_fee_int,
        rank: college.rank,
      };
    });

    res.status(200).json({
      success: true,
      data: { collegeList, campus },
    });
  } catch (error) {
    console.error("Error fetching suggested colleges:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching suggested colleges",
      error: (error as Error).message,
    });
  }
};
