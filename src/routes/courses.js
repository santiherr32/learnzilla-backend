const { Router } = require("express");
const validateCourse = require("../middlewares/validateCourse");
const router = Router();
const {
  getCourses,
  getCourseDetail,
  getCoursesTeacher,
} = require("./controller/courses/get.courses.controller.js");
const {
  postCourses,
} = require("./controller/courses/post.courses.controller.js");
const {
  deleteCourse,
} = require("./controller/courses/delete.course.controller.js");
const {
  updateCourse,
} = require("./controller/courses/update.course.controller.js");

router.post("/create", validateCourse, postCourses); //create a course
router.get("/", getCourses); //trae todos los cursos,si tiene query filtra esos cursos
router.get("/detail/:id", getCourseDetail); //trae todos los cursos,si tiene query filtra esos cursos
router.delete("/delete/:id", deleteCourse);
router.put("/update/:id",validateCourse, updateCourse);
router.get("/teacher/:teacherId", getCoursesTeacher);

module.exports = router;
