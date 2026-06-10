import { Cv, Teacher } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const postCv = async (req, res, next) => {
  const { teacherId, urlCv } = req.body;
  try {
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      throw new HttpError(404, { message: "El profesor es inválido" });
    }
    const cv = await Cv.create({
      teacherId,
      url: urlCv,
    });
    res.status(200).json({ message: "El cv se ha creado correctamente", cvId: cv.id });
  } catch (error) {
    next(error);
  }
};

export { postCv, };