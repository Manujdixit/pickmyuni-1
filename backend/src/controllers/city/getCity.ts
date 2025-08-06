import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/city/{id}:
 *   get:
 *     tags:
 *       - City
 *     summary: Get all universities in a city
 *     description: Retrieve all universities located in a specific city by city ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The city ID
 *     responses:
 *       200:
 *         description: Successfully retrieved universities in the city
 *       404:
 *         description: City not found or no universities found in this city
 *       400:
 *         description: Invalid city ID
 *       500:
 *         description: Internal server error
 */

export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid city ID. ID must be a valid number.",
      });
    }

    const cityId = Number(id);

    // Find city by ID to ensure it exists
    const city = await prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });

    // Check if city exists
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    // Find all universities in the city
    // const universities = await prisma.colleges.findMany({
    //   where: {
    //     cityId: cityId,
    //   },
    //   include: {
    //     primary_stream: true,
    //     city: true,
    //     state: true,
    //     country: true,
    //     CollegesCourses: {
    //       include: {
    //         course: true,
    //         stream: true,
    //       },
    //     },
    //   },
    //   orderBy: [
    //     {
    //       score: "desc",
    //     },
    //     {
    //       rating: "desc",
    //     },
    //   ],
    // });

    // Return universities data
    res.json({
      success: true,
      data: {
        city,
        // universities,
        // total_universities: universities.length,
      },
    });
  } catch (error) {
    console.error("Error fetching universities in city:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
