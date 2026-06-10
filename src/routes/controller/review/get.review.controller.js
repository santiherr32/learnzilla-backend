import { Review } from "../../../db.js";
import { Op } from "sequelize";

const getStudentReview = async (req, res, next) => {
  const { studentId, courseId } = req.query;
  console.log({ studentId, courseId });
  try {
    const review = await Review.findOne({
      where: {
        [Op.and]: [{ FKstudentID: studentId }, { FKcourseID: courseId }],
      },
    });
    if (!review) {
      return res.status(404).send({ flag: false });
    }
    res.status(200).send({ flag: true });
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findAll();
    if (!review) {
      res.status(404).send({ message: "Aún no hay reviews" });
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await Review.findAll({
      where: {
        FKcourseID: id,
      },
    });
    if (!review.length) {
      return res.status(404).send({ message: "El curso aún no tiene reviews" });
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
};

export { getReview,
  getReviewById,
  getStudentReview, };