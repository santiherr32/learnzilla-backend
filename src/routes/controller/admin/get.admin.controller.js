import { Admin } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const getAdmins = async (req, res, next) => {
  try {
    let admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(admins);
  } catch (err) {
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
      throw new HttpError(404, { message: "Administrador no encontrado" });
    }
    res.status(200).json(admin);
  } catch (err) {
    next(err);
  }
};

export { getAdmins,
  getAdmin, };