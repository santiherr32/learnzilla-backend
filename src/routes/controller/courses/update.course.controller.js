import { Course, Category } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";
const updateCourse = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, img } = req.body;

  try {
    const course = await Course.findOne({
      //buscamos el curso primero en base de datps
      where: { id: id },
      include: [{ model: Category }],
      attributes: ["name", "description", "price", "img"], //buscamos solo los atributos que nos interesan para comparar
    });

    if (!course) {
      throw new HttpError(404, { message: "Curso no encontrado" }); //si no se encuentra el curso
    }

    await Course.update(
      //actualizamos el curso, en caso de que un campo venga vaccío lo volvemos a actualizar con lo que ya estaba en bd
      {
        name: name ? name : course.name,
        description: description ? description : course.description,
        price: price ? price : course.price,
        img: img ? img : course.img,
      },
      { where: { id: id } }
    );
    res.status(200).json({ message: "Curso actualizado" });
  } catch (error) {
    next(error);
  }
};

export { updateCourse, };