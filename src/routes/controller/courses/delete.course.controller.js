import { Course } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const deleteCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne({
      where: {
        id: id,
      },
      attributes: ["name", "description", "price", "img", "FKteacherID"],
    });
    if (!course) {
      throw new HttpError(404, { message: "Curso no encontrado" });
    }
    await Course.destroy({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .send({ message: "Curso eliminado con Éxito", course: course });
  } catch (error) {
    next(error);
  }
};

export { deleteCourse, };