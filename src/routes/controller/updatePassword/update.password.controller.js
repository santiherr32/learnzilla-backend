require("dotenv").config();
const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } =
  process.env;
const crypto = require("crypto");
const { Student, Teacher } = require("../../../db");

const { promisify } = require("util");

const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);

async function generateHashedPassword(password) {
  const salt = await randomBytesAsync(parseInt(BYTES));
  const newSalt = salt.toString(BASE);

  const key = await pbkdf2Async(
    password,
    newSalt,
    parseInt(ITERATIONS),
    parseInt(LONG_ENCRYPTION),
    ENCRYPT_ALGORITHM
  );

  const newPassword = key.toString(BASE);
  return { newPassword, newSalt };
}

const updatePassword = async (req, res) => {
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
    console.log(err);
    res.status(404).send({ message: "Error al actualizar la contraseña" });
  }
};

module.exports = {
  updatePassword,
};
