import { Admin } from "../../../db.js";

const getAdmins = async (req, res, next) => {
  try {
    let admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(admins);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener los administradores" };
    next(err);
  }
};

const getAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    let admin = await Admin.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    if (!admin) {
      return res.status(404).send({ message: "Administrador no encontrado" });
    }
    res.status(200).json(admin);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener el adminstrador" };
    next(err);
  }
};

export { getAdmins,
  getAdmin, };