import { Category } from "../../../db.js";

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll(); //Busca todas las categorias
    res.status(200).send(category);
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export { getCategory, };