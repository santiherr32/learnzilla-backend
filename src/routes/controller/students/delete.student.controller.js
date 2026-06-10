import { Student } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const deteteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //vamos a mandar solo los atributos que nos interesan
    });
    if (!student) {
      throw new HttpError(404, { message: "Estudiante no encontrado" });
    }
    await Student.destroy({
      //eliminamos el estudiante
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Estudiante Eliminado", student });
  } catch (error) {
    next(error);
  }
};

export { deteteStudent, };