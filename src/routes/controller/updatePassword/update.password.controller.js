const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } =
  process.env;
import { randomBytes, pbkdf2 } from "crypto";
import { Student, Teacher } from "../../../db";
import { generateHashedPassword } from "../utils/PasswordHashing";

const updatePassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });

    if (student) {
      const { newPassword, newSalt } = await generateHashedPassword(password);
      await Student.update(
        {
          password: newPassword,
          salt: newSalt,
        },
        {
          where: {
            email,
          },
        }
      );

      return res.status(200).send({
        message: "Contraseña actualizada",
      });
    }

    const teacher = await Teacher.findOne({ where: { email } });

    if (teacher) {
      const { newPassword, newSalt } = await generateHashedPassword(password);
      await Teacher.update(
        {
          password: newPassword,
          salt: newSalt,
        },
        {
          where: {
            email,
          },
        }
      );

      return res.status(200).send({
        message: "Contraseña actualizada",
      });
    }

    return res.status(404).send({ message: "Correo Inválido" });
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al actualizar la contraseña" };
    next(err);
  }
};

export default {
  updatePassword,
};
