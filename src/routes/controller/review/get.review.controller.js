import { Review } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";
import { Op } from "sequelize";

const getStudentReview = async (req, res, next) => {
  const { studentId, courseId } = req.query;

  try {
    const review = await Review.findOne({
      where: {
        [Op.and]: [{ FKstudentID: studentId }, { FKcourseID: courseId }],
      },
    });
    if (!review) {
      throw new HttpError(404, { flag: false });
    }
    res.status(200).json({ flag: true });
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findAll();
    if (review.length === 0) {
      throw new HttpError(404, { message: "Aún no hay reviews" });
    }
    res.status(200).json(review);
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
    if (review.length === 0) {
      throw new HttpError(404, { message: "El curso aún no tiene reviews" });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export { getReview,
  getReviewById,
  getStudentReview, };