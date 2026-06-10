const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } =
  process.env;
import { createHash } from "crypto";
import { Student, Teacher, Admin } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";
import { generateHashedPassword } from "../../../utils/PasswordHashing.js";

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

    throw new HttpError(404, { message: "Correo Inválido" });
  } catch (err) {
    next(err);
  }
};

export default {
  updatePassword,
};
