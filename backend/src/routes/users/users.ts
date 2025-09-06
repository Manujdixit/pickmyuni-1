import { Router } from "express";
import { UsersController } from "../../controllers/users/users";

const router = Router();
const usersController = new UsersController();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

router.post("/", usersController.createUser.bind(usersController));

router.get("/:id", usersController.getUserById.bind(usersController));

export default router;
