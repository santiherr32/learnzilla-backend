import { Category } from "../../../db.js";

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll(); //Busca todas las categorias
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export { getCategory, };