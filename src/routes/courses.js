import { Router } from "express";
import validateCourse from "../middlewares/validateCourse";
const router = Router();
import {
  getCourses,
  getCourseDetail,
  getCoursesTeacher,
} from "./controller/courses/get.courses.controller.js";
import { postCourses } from "./controller/courses/post.courses.controller.js";
import { deleteCourse } from "./controller/courses/delete.course.controller.js";
import { updateCourse } from "./controller/courses/update.course.controller.js";

router.post("/create", validateCourse, postCourses); //create a course
router.get("/", getCourses); //trae todos los cursos,si tiene query filtra esos cursos
router.get("/detail/:id", getCourseDetail); //trae todos los cursos,si tiene query filtra esos cursos
router.delete("/delete/:id", deleteCourse);
router.put("/update/:id", validateCourse, updateCourse);
router.get("/teacher/:teacherId", getCoursesTeacher);

export default router;