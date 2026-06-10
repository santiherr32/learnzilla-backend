import { Category } from "../../../db.js";

const postCategory = async (req, res, next) => {
  const { name } = req.body; //name es un array de categorias o una sola categoria
  try {
    if (!Array.isArray(name)) {
      await Category.findOrCreate({
        //Busca o crea la categoria
        where: {
          name: name.trim().toLowerCase(),
        },
      });
    } else {
      for (const category of name) {
        //Recorre el array de categorias
        await Category.findOrCreate({
          //Busca o crea la categoria
          where: {
            name: category.trim().toLowerCase(),
          },
        });
      }
    }

    res.status(200).json({ message: "Categorias creadas" });
  } catch (error) {
    next(error);
  }
};

export { postCategory, };