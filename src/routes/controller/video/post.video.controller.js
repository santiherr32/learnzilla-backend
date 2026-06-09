import { Course, Video } from "../../../db";

const postVideo = async (req, res, next) => {
  let { title, description, url, cursoId, img } = req.body;
  if (Array.isArray(cursoId)) {
    cursoId = cursoId[0];
  }
  try {
    const FK = await Course.findByPk(cursoId);
    if (!FK) {
      return res.status(404).send({ message: "El curso es inválido" });
    }

    if (!img) img = "https://placeimg.com/240/120/tech";
    const video = await Video.create({
      title,
      description,
      url,
      FKcourseID: FK.id,
      img,
    });
    // console.log('llegue  a video create',FK);
    res.status(200).send({
      message: "El video se ha creado correctamente",
      videoId: video.id,
    });
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export default {
  postVideo,
};