import { Router } from "express";
const {
  EMAIL_ADMIN,
  PASSWORD_ADMIN,
} = process.env;
import { verifyHashedPassword } from "../utils/PasswordHashing.js";
const router = Router();
import { Student, Teacher, Admin } from "../db.js";
import { HttpError } from "../utils/HttpError.js";

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === EMAIL_ADMIN && password === PASSWORD_ADMIN) {
    return res.status(200).send({ authorization: true, role: "admin", id: 1 });
  }

  try {
    let role;
    let DbUser = await Student.findOne({
      where: { email: email.trim().toLowerCase() },
    }); //buscamos el usuario en la tabla de estudiantes
    role = "alumno";
    if (!DbUser) {
      //si no existe el usuario en la base de datos
      DbUser = await Teacher.findOne({
        where: { email: email.trim().toLowerCase() },
      }); //buscamos el usuario en la tabla de profesores
      role = "profesor";
      if (!DbUser) {
        //si no existe el usuario en la base de datos
        DbUser = await Admin.findOne({
          where: { email: email.trim().toLowerCase() },
        }); //buscamos el usuario en la tabla de administradores
        role = "admin";
        if (!DbUser) {
          throw new HttpError(401, { message: "usuario invalido" });
        }
      }
    }

    const { newPassword } = await verifyHashedPassword(password, DbUser.salt);

    if (DbUser.password === newPassword) {
      return res.status(200).send({ authorization: true, role, id: DbUser.id });
    }

    throw new HttpError(401, { authorization: false });
  } catch (error) {
    next(error);
  }
});

export default router;
