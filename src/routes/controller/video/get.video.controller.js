import { Video } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      where: {},
      attributes: ["id", "title", "description", "url", "FKcourseID", "img"],
    });
    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
};

const getVideoDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({
      where: { id },
      attributes: ["id", "title", "description", "url", "FKcourseID", "img"],
    });
    if (!video) {
      throw new HttpError(404, { message: "El video no existe" });
    }
    res.status(200).send(video);
  } catch (error) {
    next(error);
  }
};

const getCourseVideos = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const videos = await Video.findAll({
      where: { FKcourseID: courseId },
      attributes: ["id", "title", "description", "url", "FKcourseID", "img"],
    });
    if (!videos) {
      throw new HttpError(404, { message: "No hay videos" });
    }
    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
};

export { getAllVideos,
  getVideoDetail,
  getCourseVideos, };