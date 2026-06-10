import { Router } from "express";
const router = Router();

import { getCv, getCvs } from "./controller/cv/get.cv.controller.js";
import { postCv } from "./controller/cv/post.cv.controller.js";

router.get("/", getCvs);
router.get("/detail/:id", getCv);
router.post("/create", postCv);

export default router;