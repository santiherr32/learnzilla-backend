import { Router } from "express";
import {
  getTeachers,
  getTeacher,
} from "./controller/teachers/get.teacher.controller.js";
import { updateTeacher } from "./controller/teachers/update.teacher.controller.js";
import { deteteTeacher } from "./controller/teachers/delete.teacher.controller.js";

const router = Router();

router.get("/", getTeachers);
router.get("/detail/:id", getTeacher);
router.put("/update/:id", updateTeacher);
router.delete("/delete/:id", deteteTeacher);

export default router;
