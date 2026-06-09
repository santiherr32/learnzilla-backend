import { Router } from "express";
const {
  BASE,
  ITERATIONS,
  LONG_ENCRYPTION,
  ENCRYPT_ALGORITHM,
  EMAIL_ADMIN,
  PASSWORD_ADMIN,
} = process.env;
import { verifyHashedPassword } from "../routes/utils/PasswordHashing";
const router = Router();
import { Student, Teacher, Admin } from "../db";

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
        if (!DbUser)
          return res.status(404).send({ message: "usuario invalido" });
      }
    }

    const { newPassword } = await verifyHashedPassword(password, DbUser.salt);

    if (DbUser.password === newPassword) {
      return res.status(200).send({ authorization: true, role, id: DbUser.id });
    }

    return res.status(404).send({ authorization: false });
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
});

export default router;
