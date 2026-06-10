import { Student, Teacher, Admin } from "../../db";
const { EMAIL_USER, PASSWORD_USER } = process.env;
import nodemailer from "nodemailer";
import { generateHashedPassword } from "../../utils/PasswordHashing";

const sendConfirmationEmail = async (email, name) => {
  let Transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: PASSWORD_USER,
    },
  });
  await Transport.sendMail({
    from: "<confirmpassword@learnzilla.com>",
    to: email,
    subject: "Confirmar cuenta",
    html: `
                <h1>Hola ${name}</h1>
                <h2>Entra al siguiente link para confirmar tu cuenta <a href="https://learnzilla-app.vercel.app/confirmUser" target="_blank" rel="noreferrer">Confirmar mi cuenta</a></h2>
                `,
  });

  Transport.close();
};

const postUser = async (req, res, next) => {
  let { name, lastName, email, password, role, avatar } = req.body; //recibimos por body
  try {
    let user; //creamos una variable para guardar el usuario
    if (!avatar)
      //Asignamos avatar por defecto en caso de no venir
      avatar =
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    //Verificamos si alguno e los email está ya en la base de datos
    const [existingStudent, existingTeacher, existingAdmin] = await Promise.all(
      [
        Student.findOne({ where: { email } }),
        Teacher.findOne({ where: { email } }),
        Admin.findOne({ where: { email } }),
      ]
    );
    if (existingStudent || existingTeacher || existingAdmin) {
      return res.status(404).send({ message: "El correo ya esta registrado" });
    }

    const { newPassword, newSalt } = await generateHashedPassword(password);

    if (role === "alumno") {
      const student = await Student.create({
        name,
        lastName,
        email: email.trim().toLowerCase(),
        password: newPassword,
        avatar,
        salt: newSalt,
        authorization: false,
        role: "alumno",
      });
      user = student;
      //await sendConfirmationEmail(email, name);
    } else if (role === "profesor") {
      //si es profesor
      const teacher = await Teacher.create({
        name,
        lastName,
        email: email.trim().toLowerCase(),
        password: newPassword,
        avatar,
        salt: newSalt,
        authorization: false,
        role: "profesor",
      });
      user = teacher;
      //await sendConfirmationEmail(email, name);
    } else if (role === "admin") {
      //si es admin
      const admin = await Admin.create({
        name,
        lastName,
        email: email.trim().toLowerCase(),
        password: newPassword,
        avatar,
        salt: newSalt,
        authorization: false,
        role: "admin",
      });
      user = admin;
    } else {
      return res.status(404).send({ message: "El rol no es valido" });
    }
    res
      .status(200)
      .send({ message: "Usuario Registrado con Éxito", userId: user.id });
  } catch (error) {
    next(error);
  }
};

export default postUser;
