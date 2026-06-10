import { Category } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

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
      throw new HttpError(404, { message: "Categoria no encontrada" });
    }
    await category.destroy({
      //eliminamos la categoria
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: "Categoria eliminada", category: category.name });
  } catch (error) {
    next(error);
  }
};

export { deleteCategory, };