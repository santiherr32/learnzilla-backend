import express from "express";
const router = express.Router();
import { Student, Teacher } from "../db.js";
import cors from "cors";
import { json, urlencoded } from "express";
import { generateHashedPassword } from "../utils/PasswordHashing.js";
import { HttpError } from "../utils/HttpError.js";
router.use(json());
router.use(urlencoded({ extended: true }));
router.use(cors());

router.put("/confirm", async (req, res, next) => {
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
      return res.status(200).json({ authorization: true });
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
      return res.status(200).json({ authorization: true });
    } else {
      return res.status(400).json({ message: "Algo no funcionó bien" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/forgotpassword", async (req, res, next) => {
  const { email, password } = req.body;

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
      return res.status(200).json({ message: "Contraseña cambiada" });
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
      return res.status(200).json({ message: "Contraseña cambiada" });
    }

    throw new HttpError(400, "Email incorrecto");
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  let { name, lastName, email, password, salt } = req.body;
  try {
    const user = await Student.create({
      name,
      lastName,
      email,
      password,
      salt,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
router.get("/student", async (req, res, next) => {
  try {
    let student = await Student.findAll();
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

export default router;
