import { Teacher } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const updateTeacher = async (req, res, next) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const teacher = await Teacher.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    if (!teacher) {
      throw new HttpError(404, { message: "Profesor no encontrado" });
    }
    await Teacher.update(
      //actualizamos el estudiante, solo si el atributo que se quiere actualizar no esta vacio
      {
        name: name ? name : teacher.name,
        lastName: lastName ? lastName : teacher.lastName,
        email: email ? email : teacher.email,
        avatar: avatar ? avatar : teacher.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ message: "Profesor Actualizado" });
  } catch (error) {
    next(error);
  }
};

export { updateTeacher, };