import { Router } from "express";
const router = Router();
import { getLastFiveCourses } from "./controller/home/getHome.js";

router.get("/", getLastFiveCourses);

export default router;