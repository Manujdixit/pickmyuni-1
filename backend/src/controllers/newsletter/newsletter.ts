import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 * @swagger
 * /api/v1/newsletter:
 *   post:
 *     summary: Create a new newsletter
 *     tags: [Newsletter]
 *     description: Create a new newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the newsletter
 *               email:
 *                 type: string
 *                 description: Email address of the newsletter
 *     responses:
 *       201:
 *         description: Successfully created newsletter
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
export const createNewsletterEntry = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const newsletter = await prisma.newsletter.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(newsletter);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /api/v1/newsletter:
 *   get:
 *     summary: Get all newsletters
 *     tags: [Newsletter]
 *     description: Get all newsletters
 *     responses:
 *       200:
 *         description: Successfully retrieved newsletters
 *       500:
 *         description: Internal server error
 */
export const getAllNewsletters = async (req: Request, res: Response) => {
  try {
    const newsletters = await prisma.newsletter.findMany();

    res.status(200).json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
