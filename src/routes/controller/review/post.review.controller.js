import { Course, Student, Review } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const postReview = async (req, res, next) => {
  const { courseId, studentId, score } = req.body;
  try {
    const FKCourse = await Course.findOne({
      where: {
        id: courseId,
      },
    });
    if (!FKCourse) {
      throw new HttpError(404, { message: "El curso no existe" });
    }
    const FKStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });
    if (!FKStudent) {
      throw new HttpError(404, { message: "El estudiante no existe" });
    }
    const flag = await Review.findOne({
      where: {
        FKstudentID: FKStudent.id,
        FKcourseID: FKCourse.id,
      },
      attributes: ["flag"],
    });
    if (!flag) {
      try {
        const review = await Review.create({
          score,
          flag: true,
          FKstudentID: FKStudent.id,
          FKcourseID: FKCourse.id,
        });
        res.status(200).json({
          message: "Se ha añadido la reseña correctamente",
          flag: review.flag,
        });
      } catch (error) {
        next(error);
      }
    } else {
      throw new HttpError(409, { message: "Ya has calificado este curso" });
    }
  } catch (error) {
    next(error);
  }
};

export { postReview, };