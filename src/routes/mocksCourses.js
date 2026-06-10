import { Router } from "express";
const router = Router();
import { courseMocks } from "./mocks/mocksDataCourses.js";
import { HttpError } from "../utils/HttpError.js";

router.get("/", (req, res) => {
  res.status(200).json(courseMocks);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = courseMocks.find((course) => course.id === parseInt(id, 10));
  if (course) {
    res.status(200).json(course);
  } else {
    throw new HttpError(404, { message: "No existe el curso" });
  }
});

export default router;