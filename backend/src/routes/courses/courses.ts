import express from "express";
import { getAllCourses } from "../../controllers/courses/getCourses";
import { getCourse } from "../../controllers/courses/getCourse";
import { getAllCollegeCourses } from "../../controllers/courses/getAllCollegeCourses";

const CoursesRouter = express.Router();

CoursesRouter.get("/", getAllCourses as any);
CoursesRouter.get("/single", getCourse as any);
CoursesRouter.get("/all", getAllCollegeCourses as any);

export default CoursesRouter;
