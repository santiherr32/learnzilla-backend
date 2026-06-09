import { Category } from "../../../db.js";

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      //buscamos la categoria
      where: {
        id: id,
      },
    });
    if (!category) {
      res.status(404).send({ message: "Categoria no encontrada" });
    }
    await category.destroy({
      //eliminamos la categoria
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .send({ message: "Categoria eliminada", category: category.name }); //devolvemos la categoria eliminada
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export { deleteCategory, };