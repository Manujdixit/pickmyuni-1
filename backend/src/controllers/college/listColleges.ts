import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import NodeCache from "node-cache";

/**
 * @swagger
 * /api/v1/college/list:
 *   get:
 *     tags:
 *       - Colleges
 *     summary: Get list of colleges pagination, also gives primary stream, city, state, country, and courses list which has colleges. with optional city filter by id.
 *     descriptin: Retrieve a paginated list of colleges. Results are sorted by score in descending order. Also gives primary stream, city, state, country, and courses list which has colleges. with optional city filter by id.
 *     parameters:
 *       - in: query
 *         name: searchquery
 *         schema:
 *           type: string
 *         description: Search colleges by name
 *       - in: query
 *         name: statename
 *         schema:
 *           type: string
 *         description: Filter colleges by state name
 *       - in: query
 *         name: coursename
 *         schema:
 *           type: string
 *         description: Filter colleges by course name
 *       - in: query
 *         name: min_fees
 *         schema:
 *           type: number
 *         description: Minimum fees filter (in AUD)
 *       - in: query
 *         name: max_fees
 *         schema:
 *           type: number
 *         description: Maximum fees filter (in AUD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [score_desc, score_asc, rating_desc, rating_asc]
 *           default: score_desc
 *         description: Sort colleges by score or rating
 *       - in: query
 *         name: streamname
 *         schema:
 *           type: string
 *         description: Filter colleges by stream name
 *     responses:
 *       200:
 *         description: Successfully retrieved college list
 *       500:
 *         description: Internal server error
 */

export const collegeListCache = new NodeCache({ stdTTL: 300 });

export const getCollegeList = async (req: Request, res: Response) => {
  try {
    // Create a cache key based on query params
    const cacheKey = JSON.stringify(req.query);
    const cachedData = collegeListCache.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for college list");
      return res.status(200).json(cachedData);
    }

    const {
      page = 1,
      limit = 10,
      searchquery,
      statename,
      coursename,
      type,
      min_fees,
      max_fees,
      streamname,
      sortBy = "score_desc",
    } = req.query;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build where clause with optional filters
    const whereClause: any = {};

    if (searchquery) {
      whereClause.college_name = {
        contains: String(searchquery),
        mode: "insensitive",
      };
    }

    if (statename) {
      whereClause.state = {
        slug: {
          contains: String(statename),
          mode: "insensitive",
        },
      };
    }

    if (coursename) {
      whereClause.CollegesCourses = {
        some: {
          course: {
            slug: {
              contains: String(coursename),
              mode: "insensitive",
            },
          },
        },
      };
    }

    if (streamname) {
      whereClause.primary_stream = {
        slug: {
          contains: String(streamname),
          mode: "insensitive",
        },
      };
    }

    if (min_fees || max_fees) {
      whereClause.avg_fees_in_aud = {};
      if (min_fees) {
        whereClause.avg_fees_in_aud.gte = Number(min_fees);
      }
      if (max_fees) {
        whereClause.avg_fees_in_aud.lte = Number(max_fees);
      }
    }

    if (type) {
      whereClause.type = type;
    }

    let getContentFor;
    // Set getContentFor according to priority: state > stream > course
    if (statename) {
      getContentFor = "state";
    } else if (streamname) {
      getContentFor = "stream";
    } else if (coursename) {
      getContentFor = "course";
    } else {
      getContentFor = undefined;
    }

    const getContent = () => {
      if (getContentFor === "state" && statename) {
        return prisma.state.findFirst({
          where: { slug: { contains: String(statename), mode: "insensitive" } },
          select: { content: true },
        });
      }
      if (getContentFor === "stream" && streamname) {
        return prisma.stream.findFirst({
          where: {
            slug: { contains: String(streamname), mode: "insensitive" },
          },
          select: { content: true },
        });
      }
      if (getContentFor === "course" && coursename) {
        return prisma.courses.findFirst({
          where: {
            slug: { contains: String(coursename), mode: "insensitive" },
          },
          select: { content: true },
        });
      }
      return Promise.resolve(null);
    };

    // Determine sort order
    let orderBy: any = { score: "desc" }; // default

    switch (sortBy) {
      case "score_asc":
        orderBy = { score: "asc" };
        break;
      case "score_desc":
        orderBy = { score: "desc" };
        break;
      case "rating_asc":
        orderBy = { rating: "asc" };
        break;
      case "rating_desc":
        orderBy = { rating: "desc" };
        break;
      default:
        orderBy = { score: "desc" };
    }

    // Fetch colleges and total count in parallel for efficiency
    const [colleges, totalColleges, content, streams, states, courses] =
      await Promise.all([
        prisma.colleges.findMany({
          where: whereClause,
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
            type: true,
            level: true,
            city: { select: { name: true } },
            state: { select: { name: true } },
            CollegesCourses: { select: { id: true } },
          },
          orderBy,
          skip,
          take,
        }),
        prisma.colleges.count({ where: whereClause }),
        getContent(),
        prisma.stream.findMany({
          where: { Colleges: { some: {} } },
          select: { id: true, name: true, slug: true },
          orderBy: { name: "asc" },
        }),
        prisma.state.findMany({
          where: { Colleges: { some: {} } },
          select: { id: true, name: true, slug: true },
          orderBy: { name: "asc" },
        }),
        prisma.courses.findMany({
          where: { CollegesCourses: { some: {} } },
          select: { id: true, course_name: true, slug: true },
          orderBy: { course_name: "asc" },
        }),
      ]);

    // Transform data to include course_count and flatten city/state names
    const collegeList = colleges.map((college) => ({
      id: college.id,
      slug: college.slug,
      logo_url: college.logo_url,
      college_name: college.college_name,
      location: college.location,
      rating: college.rating,
      score: college.score,
      brochure_url: college.brochure_url,
      avg_fees_in_aud: college.avg_fees_in_aud,
      city_name: college.city.name,
      state_name: college.state.name,
      course_count: college.CollegesCourses.length,
      type: college.type,
      level: college.level,
    }));

    const response = {
      success: true,
      data: {
        colleges: collegeList,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalColleges / Number(limit)),
          totalItems: totalColleges,
          itemsPerPage: Number(limit),
        },
        filters: {
          stream: streams,
          state: states,
          courses: courses,
          type: ["government", "private", "other"],
          level: ["level1", "level2", "level3"],
          content: content?.content,
        },
      },
    };
    // Cache the response
    collegeListCache.set(cacheKey, response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching college list:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
