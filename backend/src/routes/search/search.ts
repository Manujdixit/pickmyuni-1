import express from "express";
import { globalSearch } from "../../controllers/search/search";
import { collegeSearch } from "../../controllers/search/collegeSearch";

const SearchRouter = express.Router();

SearchRouter.get("/", globalSearch as any);
SearchRouter.get("/colleges", collegeSearch as any);

export default SearchRouter;
