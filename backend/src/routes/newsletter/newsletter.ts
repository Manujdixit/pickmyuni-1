import express from "express";
import {
  createNewsletterEntry,
  getAllNewsletters,
} from "../../controllers/newsletter/newsletter";

const NewsletterRouter = express.Router();

NewsletterRouter.post("/", createNewsletterEntry as any);
NewsletterRouter.get("/", getAllNewsletters as any);

export default NewsletterRouter;
