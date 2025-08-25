import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { ArticlesSilos } from "@prisma/client";

/**
 * @swagger
 * /api/v1/articles/new:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get all articles
 *     description: Retrieve all articles
 *     parameters:
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
 *           default: 6
 *         description: Number of items per page
 *       - in: query
 *         name: silos
 *         schema:
 *           type: string
 *         description: Filter articles by silos
 *     responses:
 *       200:
 *         description: Successfully retrieved all articles
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Invalid article ID
 *       404:
 *         description: Article not found or no universities found in this article

 */

export const getAllArticlesNew = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, silos } = req.query;

    //pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const whereClause: any = {};

    if (silos && silos !== "all" && silos !== "null") {
      const normalizedSilos = (silos as string)
        .replace(/\s+/g, "")
        .toLowerCase();
      const silosEnum = Object.values(ArticlesSilos).find(
        (val) => val.replace(/\s+/g, "").toLowerCase() === normalizedSilos
      );
      if (!silosEnum) {
        return res.status(400).json({
          success: false,
          message: "Invalid silos value",
        });
      }
      whereClause.silos = silosEnum;
    }

    const [articles, totalArticles, allSilos] = await Promise.all([
      prisma.articles.findMany({
        where: whereClause,
        select: {
          id: true,
          slug: true,
          silos: true,
          title: true,
          content: true,
          createdAt: true,
          img1: true,
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.articles.count({ where: whereClause }),
      prisma.articles.findMany({
        select: { silos: true },
        distinct: ["silos"],
      }),
    ]);

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalArticles / Number(limit)),
          totalItems: totalArticles,
          itemsPerPage: Number(limit),
        },
        allSilos: allSilos.map((s: any) => s.silos),
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
