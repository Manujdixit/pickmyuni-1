import express from "express";
import { getTopColleges } from "../../controllers/college/topColleges";
import { collegeInfo } from "../../controllers/college/info";
import { getCollegeFeesInfo } from "../../controllers/college/fees";
import { getCollegeCampusesInfo } from "../../controllers/college/campus";
import { getCollegefaq } from "../../controllers/college/faqs";
import { getCollegePlacementInfo } from "../../controllers/college/placement";
import { getCollegeScholarshipInfo } from "../../controllers/college/scholarships";
import { getCollegeRankingsInfo } from "../../controllers/college/ranking";
import { getCollegeCareersInfo } from "../../controllers/college/careers";
import { getCollegeList } from "../../controllers/college/listColleges";
import { getCollegeById } from "../../controllers/college/getCollegeById";
import { getCollegeBanner } from "../../controllers/college/getCollegeBanner";
import { getAllColleges } from "../../controllers/college/getAllColleges";
import { suggestedColleges } from "../../controllers/college/campuses";
import { relatedCourses } from "../../controllers/college/relatedCourses";
import { compareColleges } from "../../controllers/college/comparison";
import { getCollegeOtherInfo } from "../../controllers/college/other";
import { getCollegeFacilitiesInfo } from "../../controllers/college/facilities";
import { getCollegeNewsInfo } from "../../controllers/college/news";

const CollegeRouter = express.Router();

CollegeRouter.get("/", getAllColleges as any);
CollegeRouter.get("/list", getCollegeList as any);
CollegeRouter.get("/top", getTopColleges as any);
CollegeRouter.get("/compare", compareColleges as any);
CollegeRouter.get("/suggest/:id", suggestedColleges as any);

CollegeRouter.get("/info/:id", collegeInfo as any);
// CollegeRouter.get("/courses/:id", getCollegeCoursesInfo as any);
CollegeRouter.get("/fees/:id", getCollegeFeesInfo as any);
CollegeRouter.get("/courses/:id", relatedCourses as any);
CollegeRouter.get("/campuses/:id", getCollegeCampusesInfo as any);
CollegeRouter.get("/careers/:id", getCollegeCareersInfo as any);
CollegeRouter.get("/ranking/:id", getCollegeRankingsInfo as any);
CollegeRouter.get("/scholarships/:id", getCollegeScholarshipInfo as any);
CollegeRouter.get("/placement/:id", getCollegePlacementInfo as any);
CollegeRouter.get("/faqs/:id", getCollegefaq as any);
CollegeRouter.get("/others/:id", getCollegeOtherInfo as any);
CollegeRouter.get("/facilities/:id", getCollegeFacilitiesInfo as any);
CollegeRouter.get("/reviews/:id", getCollegefaq as any);
CollegeRouter.get("/accomodations/:id", getCollegefaq as any);
CollegeRouter.get("/news/:id", getCollegeNewsInfo as any);

CollegeRouter.get("/:id/banner", getCollegeBanner as any);
CollegeRouter.get("/:id", getCollegeById as any);

export default CollegeRouter;
