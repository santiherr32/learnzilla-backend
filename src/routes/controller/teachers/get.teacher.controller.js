import { Teacher } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const getTeachers = async (req, res, next) => {
  try {
    let teachers = await Teacher.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(teachers);
  } catch (err) {
    next(err);
  }
};

const getTeacher = async (req, res, next) => {
  const { id } = req.params;
  try {
    let teacher = await Teacher.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    if (!teacher) {
      throw new HttpError(404, { message: "Profesor no encontrado" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    next(err);
  }
};

export { getTeachers,
  getTeacher, };