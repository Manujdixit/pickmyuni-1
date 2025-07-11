import express from "express";
import { getTopColleges } from "../../controllers/college/topColleges";
import { collegeInfo } from "../../controllers/college/info";
import { getCollegeCoursesInfo } from "../../controllers/college/courses";
import { getCollegeFeesInfo } from "../../controllers/college/fees";
import { getCollegeDepartmentsInfo } from "../../controllers/college/departments";
import { getCollegefaq } from "../../controllers/college/faqs";
import { getCollegePlacementInfo } from "../../controllers/college/placement";
import { getCollegeScholarshipInfo } from "../../controllers/college/scholarships";
import { getCollegeRankingsInfo } from "../../controllers/college/ranking";
import { getCollegeCareersInfo } from "../../controllers/college/careers";
import { getCollegeList } from "../../controllers/college/listColleges";
import { getCollegeById } from "../../controllers/college/getCollegeById";
import { getAllColleges } from "../../controllers/college/getAllColleges";
import { suggestedColleges } from "../../controllers/college/suggestColleges";
import { relatedCourses } from "../../controllers/college/relatedCourses";
import { compareColleges } from "../../controllers/college/comparison";

const CollegeRouter = express.Router();

CollegeRouter.get("/", getAllColleges as any);
CollegeRouter.get("/list", getCollegeList as any);
CollegeRouter.get("/top", getTopColleges as any);
CollegeRouter.get("/compare", compareColleges as any);
CollegeRouter.get("/suggest/:id", suggestedColleges as any);
CollegeRouter.get("/courses/:id", relatedCourses as any);

CollegeRouter.get("/info/:id", collegeInfo as any);
// CollegeRouter.get("/courses/:id", getCollegeCoursesInfo as any);
CollegeRouter.get("/fees/:id", getCollegeFeesInfo as any);
CollegeRouter.get("/campuses/:id", getCollegeDepartmentsInfo as any);
CollegeRouter.get("/careers/:id", getCollegeCareersInfo as any);
CollegeRouter.get("/ranking/:id", getCollegeRankingsInfo as any);
CollegeRouter.get("/scholarships/:id", getCollegeScholarshipInfo as any);
CollegeRouter.get("/placement/:id", getCollegePlacementInfo as any);
CollegeRouter.get("/faqs/:id", getCollegefaq as any);
CollegeRouter.get("/:id", getCollegeById as any);

export default CollegeRouter;
