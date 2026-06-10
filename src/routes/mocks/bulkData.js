import {
  Student,
  Teacher,
  Course,
  Review,
  Video,
  Category,
  Datamaker,
} from "../../db.js";
import { generateHashedPassword } from "../../utils/PasswordHashing.js";
import { courseMocks, videos, imagenes } from "./mocksDataCourses.js";
import { getCategoryId } from "../controller/getCategoryId.js";

const { FAKE_PASSWORD } = process.env;

//función que retorna un número aleatorio entero entre 1 y 5
const randomNumber = () => {
  let randomNumber = Math.floor(Math.random() * 5) + 1;
  return randomNumber;
};

const randomVideosImg = () => {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
};



const uniqueCategories = (courses) => {
  let array = [];
  //almacena en un objeto cada curso solo una vez
  courses.forEach((course) => {
    course.category.forEach((e) => {
      array.push(e);
    });
  });
  //elimina los elementos que esten repetidos en el array
  const unique = [...new Set(array)];
  return unique;
};

const randomPrice = () => {
  let randomNumber = Math.floor(Math.random() * 999) + 10;
  return randomNumber;
};

const categories = uniqueCategories(courseMocks);

const categoryMaker = async () => {
  for (const category of categories) {
    //Recorre el array de categorias
    await Category.findOrCreate({
      //Busca o crea la categoria
      where: {
        name: category.trim().toLowerCase(),
      },
    });
  }
};
const teacherMaker = async () => {
  const password = FAKE_PASSWORD;
  const { newPassword, newSalt } = await generateHashedPassword(password);
  await Teacher.create({
    name: "TeacherMaker",
    lastName: "BulkCreate",
    email: "makerprofesor@email.com",
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    salt: newSalt,
    password: newPassword,
    authorization: false,
    role: "profesor",
  });
};

const teacherMaker2 = async () => {
  const teacher = await Teacher.create({
    name: "Jhon",
    lastName: "Mircha",
    email: "01teacher@email.com",
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    salt: "salt",
    password: "password",
    authorization: false,
    role: "profesor",
  });
  return teacher.id;
};

const StudentMaker = async () => {
  const password = FAKE_PASSWORD;
  const { newPassword, newSalt } = await generateHashedPassword(password);
  await Student.create({
    name: "StudentMaker",
    lastName: "BulkCreate",
    email: "makerstudent@email.com",
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    salt: newSalt,
    password: newPassword,
    authorization: false,
    role: "alumno",
  });
};

const studentMaker2 = async () => {
  const student = await Student.create({
    name: "StudentTest1",
    lastName: "BulkCreate",
    email: "01student@email.com",
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    salt: "salt",
    password: "password",
    authorization: false,
    role: "alumno",
  });
  return student.id;
};

const reviewMaker = async (studentId) => {
  const courses = await Course.findAll({});
  for (const course of courses) {
    await Review.create({
      score: randomNumber(),
      flag: true,
      FKstudentID: studentId,
      FKcourseID: course.id,
    });
  }
};

const videoMaker = async () => {
  const courses = await Course.findAll({});
  for (const course of courses) {
    let count = 1;
    for (let i = 0; i < videos.length; i++) {
      const index = randomVideosImg();
      await Video.create({
        title: `Clase Nro ${count}`,
        description:
          "Aprende a Dominar una de las herramienta más utilizadas por todos los desarrolladores web, programadores y expertos en código profesionales.",
        url: videos[index - 1],
        FKcourseID: course.id,
        img: imagenes[index - 1],
      });
      count++;
    }
  }
};

const courseMaker = async (teacherId) => {
  for (const course of courseMocks) {
    const index = randomVideosImg();
    const courseCreated = await Course.create({
      name: course.name,
      description: course.description,
      price: randomPrice(),
      img: imagenes[index - 1],
      FKteacherID: teacherId,
    });
    const categoryID = await getCategoryId(course.category); //Busca el id de las categorias
    await courseCreated.addCategory(categoryID);
  }
};

const buyMaker = async (studentId) => {
  const courses = await Course.findAll({});
  const student = await Student.findOne({
    //Busca el estudiante
    where: {
      id: studentId,
    },
  });
  for (const course of courses) {
    await student.addCourse(course.id);
  }
};

const dataMaker = async (req, res, next) => {
  try {
    const data = await Datamaker.findAll({});
    if (data.length > 0)
      return res
        .status(400)
        .json({ message: "Ya se ha creado data anteriormente" });
    await Datamaker.create({ called: true });
    await categoryMaker();
    await teacherMaker();
    const teacherId = await teacherMaker2();
    await courseMaker(teacherId);
    await StudentMaker();
    const studentId = await studentMaker2();
    await reviewMaker(studentId);
    await videoMaker();
    await buyMaker(studentId);
    res.status(200).json({ message: "Data creada" });
  } catch (error) {
    next(error);
  }
};

export default dataMaker;
