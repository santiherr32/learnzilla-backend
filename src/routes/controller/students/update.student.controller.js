import { Student } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const student = await Student.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    if (!student) {
      throw new HttpError(404, { message: "Estudiante no encontrado" });
    }
    await Student.update(
      //actualizamos el estudiante, solo si el atributo que se quiere actualizar no esta vacio
      {
        name: name ? name : student.name,
        lastName: lastName ? lastName : student.lastName,
        email: email ? email : student.email,
        avatar: avatar ? avatar : student.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ message: "Estudiante Actualizado" });
  } catch (error) {
    next(error);
  }
};

export { updateStudent, };