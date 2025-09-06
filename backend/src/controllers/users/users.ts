import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class UsersController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               contact_number:
   *                 type: string
   *               gender:
   *                 type: string
   *               dob:
   *                 type: string
   *                 format: date
   *               iAm:
   *                 type: string
   *               college_roll_number:
   *                 type: string
   *               user_location:
   *                 type: string
   *               referred_by:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       200:
   *         description: User already exists
   */
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;

      // Handle iAm field mapping to user_type
      if (userData.iAm && !userData.user_type) {
        userData.user_type = userData.iAm;
      }
      // Remove iAm from the data to prevent Prisma error
      delete userData.iAm;

      // Check if user with email already exists
      if (userData.email) {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: userData.email },
              { contact_number: userData.contact_number },
            ],
          },
        });

        if (existingUser) {
          return res.status(200).json({
            success: true,
            message: "User already exists",
            data: existingUser,
          });
        }
      }

      // Generate custom code
      const customCode = `USER${Date.now()}${Math.random()
        .toString(36)
        .substr(2, 5)
        .toUpperCase()}`;

      // Convert date string to Date object if provided
      if (userData.dob) {
        userData.dob = new Date(userData.dob);
      }

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          ...userData,
          custom_code: customCode,
        },
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          reviews: true,
          referrer: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
