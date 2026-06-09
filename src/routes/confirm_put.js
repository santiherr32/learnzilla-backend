import express from "express";
const router = express.Router();
import { Student, Teacher } from "../db";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { generateHashedPassword } from "../routes/utils/PasswordHashing";
router.use(json());
router.use(urlencoded({ extended: true }));
router.use(cors());

router.put("/confirm", async (req, res) => {
  const { email } = req.body;
  try {
    const verifyEmailStudent = await Student.findOne({ where: { email } });
    if (verifyEmailStudent) {
      await Student.update(
        {
          authorization: true,
        },
        {
          where: {
            email,
          },
        }
      );
      return res.send("Authorization=true!");
    }
    const verifyEmailTeacher = await Teacher.findOne({ where: { email } });
    if (verifyEmailTeacher) {
      await Teacher.update(
        {
          authorization: true,
        },
        {
          where: {
            email,
          },
        }
      );
      return res.send("Authorization=true!");
    } else {
      return res.send("Algo no funcionó bien");
    }
  } catch (error) {
    error.body = "No pudo confirmarse";
    next(error);
  }
});

router.post("/forgotpassword", async (req, res) => {
  const { email, password } = req.body;
  console.log(password, email);
  try {
    const verifyEmailStudent = await Student.findOne({ where: { email } });
    if (verifyEmailStudent) {
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
      return res.send({ message: "Contraseña cambiada" });
    }

    const verifyEmailTeacher = await Teacher.findOne({ where: { email } });
    if (verifyEmailTeacher) {
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
      return res.send("Contraseña cambiada");
    }

    return res.status(400).send("Email incorrecto");
  } catch (error) {
    error.body = error;
    next(error);
  }
});

router.post("/register", async (req, res) => {
  let { name, lastName, email, password, salt } = req.body;
  try {
    const user = await Student.create({
      name,
      lastName,
      email,
      password,
      salt,
    });
    res.json(user);
  } catch (error) {
    error.body = `ERROR ${error}`;
    next(error);
  }
});
router.get("/student", async (req, res) => {
  try {
    let student = await Student.findAll();
    res.send(student);
  } catch (error) {
    error.body = error;
    next(error);
  }
});

export default router;
