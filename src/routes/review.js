import { Router } from "express";
const router = Router();
import { postReview } from "./controller/review/post.review.controller.js";
import {
  getReview,
  getReviewById,
  getStudentReview,
} from "./controller/review/get.review.controller";

router.post("/create", postReview);
router.get("/", getReview);
router.get("/detail/:id", getReviewById);
router.get("/verify", getStudentReview);

export default router;