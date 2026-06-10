import { Router } from "express";

const router = Router();

import {
  getStudents,
  getStudent,
} from "./controller/students/get.students.controller.js";
import { updateStudent } from "./controller/students/update.student.controller.js";
import { deteteStudent } from "./controller/students/delete.student.controller.js";

router.get("/", getStudents);
router.get("/detail/:id", getStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deteteStudent);

export default router;