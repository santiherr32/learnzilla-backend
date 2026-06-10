import { Video } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const deleteVideo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({
      where: { id: id },
      attributes: ["title", "description", "url", "FKcourseID"],
    });
    if (!video) {
      throw new HttpError(404, { message: "El video no existe" });
    }
    await Video.destroy({
      where: { id },
    });
    res
      .status(200)
      .send({ message: "El video se ha eliminado correctamente", video });
  } catch (error) {
    next(error);
  }
};

export { deleteVideo, };