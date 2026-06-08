import express from "express";
const router = express().Router();
import { Student, Teacher } from "../db";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { generateHashedPassword } from "../utils/passwordUtils";
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
      res.send("Authorization=true!");
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
      res.send("Authorization=true!");
    } else {
      res.send("Algo no funcionó bien");
    }
  } catch (error) {
    res.sendStatus(500).send("No pudo confirmarse");
  }
});

router.post("/forgotpassword", async (req, res) => {
  const { email, password } = req.body;
  console.log(password, email);
  try {
    let verifyEmailStudent = await Student.findOne({ where: { email } });
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
    } else {
      return res.status(400).send("Email incorrecto");
    }

    let verifyEmailTeacher = await Teacher.findOne({ where: { email } });
    if (verifyEmailTeacher) {
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
    } else {
      return res.status(400).send("Email incorrecto");
    }
  } catch (error) {
    return res.sendStatus(500).send(error);
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
    return res.send(`ERROR ${error}`);
  }
});
router.get("/student", async (req, res) => {
  try {
    let student = await Student.findAll();
    res.send(student);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
});

export default router;
