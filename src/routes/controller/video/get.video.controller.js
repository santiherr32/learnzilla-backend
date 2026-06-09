import { Video } from "../../../db.js";

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      where: {},
      attributes: ["id", "title", "description", "url", "FKcourseID", "img"],
    });
    res.status(200).send(videos);
  } catch (error) {
    error.status = 404;
    error.body = error;
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
      return res.status(404).send({ message: "El video no existe" });
    }
    res.status(200).send(video);
  } catch (error) {
    error.status = 404;
    error.body = error;
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
      return res.status(404).send({ message: "No hay videos" });
    }
    res.status(200).send(videos);
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export { getAllVideos,
  getVideoDetail,
  getCourseVideos, };