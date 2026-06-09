import { Teacher } from "../../../db.js";

const getTeachers = async (req, res, next) => {
  try {
    let teachers = await Teacher.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(teachers);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener los profesores" };
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
      return res.status(404).send({ message: "Profesor no encontrado" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener el profesor" };
    next(err);
  }
};

export { getTeachers,
  getTeacher, };