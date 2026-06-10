import { Video } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const updateVideo = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, url, img } = req.body;

  try {
    const video = await Video.findOne({
      where: { id: id },
      attributes: ["title", "description", "url", "img"],
    });
    if (!video) {
      throw new HttpError(404, { message: "El video no existe" });
    }
    await Video.update(
      {
        title: title ? title : video.title,
        description: description ? description : video.description,
        url: url ? url : video.url,
        img: img ? img : video.img,
      },
      { where: { id: id } }
    );
    res
      .status(200)
      .send({ message: "El video se ha actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};

export { updateVideo, };