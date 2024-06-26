const { Category } = require("../../../db.js");

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
    // const categoriesCreated = await Category.findAll(); //Busca todas las categorias
    res.status(200).send({ message: "Categorias creadas" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  postCategory,
};
