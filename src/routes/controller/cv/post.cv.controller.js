import { Cv, Teacher } from "../../../db.js";

const postCv = async (req, res, next) => {
  const { teacherId, urlCv } = req.body;
  try {
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).send({ message: "El profesor es inválido" });
    }
    const cv = await Cv.create({
      teacherId,
      url: urlCv,
    });
    res.send({ message: "El cv se ha creado correctamente", cvId: cv.id });
  } catch (error) {
    next(error);
  }
};

export { postCv, };