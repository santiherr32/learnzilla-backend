import { Teacher } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const deteteTeacher = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos los atributos que nos interesan
    });
    if (!teacher) {
      throw new HttpError(404, { message: "Profesor no encontrado" });
    }
    await Teacher.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Profesor Eliminado", teacher }); //enviamos el profesor eliminado
  } catch (error) {
    next(error);
  }
};

export { deteteTeacher, };