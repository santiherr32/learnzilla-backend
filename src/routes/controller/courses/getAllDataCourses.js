//Función para obtener la data de todos los cursos
const { where } = require("sequelize");
const { Course, Category, Review, Teacher, conn } = require("../../../db.js");
const { getInfoCourse } = require("./getInfoCourse");

const getAllDataCourses = async () => {
  try {
    const courses = await Course.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "img",
        [
          conn.fn("ROUND", conn.fn("AVG", conn.col("Reviews.score")), 1),
          "meanReview",
        ],
      ],
      include: [
        {
          model: Review,
          attributes: [],
          as: "Reviews",
        },
        {
          model: Category,
          as: "Categories",
          attributes: ["id", "name"],
          through: { attributes: [] }, // Previene que se incluyan los atributos de las tablas intermedias como Course_Category
          required: false,
        },
        {
          model: Teacher,
          attributes: ["id", "name", "lastName"],
          as: "Teacher",
        },
      ],
      group: [
        "course.id",
        "Categories.id",
        "Categories.name",
        "Teacher.id",
        "Teacher.name",
        "Teacher.lastName",
      ],
    });
    return courses;
  } catch (error) {
    console.error("Error en getAllDataCourses:", error.message);
    throw new Error("No se pudieron obtener los cursos");
  }
};

const getAllDataCoursesOfOneTeacher = async (teacherId) => {
  try {
    let getAllCourses = await Course.findAll({
      //Busca todos los cursos de un profesor
      where: {
        FKteacherID: teacherId,
      },
      attributes: ["name"],
    });
    let arrayAllCoursesInfo = []; //Array que contendrá todos los cursos
    for (const courseName of getAllCourses) {
      //Recorre todos los cursos
      let temporaryInfo = await getInfoCourse(courseName.dataValues.name); //Obtiene la información del curso
      arrayAllCoursesInfo.push(temporaryInfo); //Agrega la información del curso al array
    }
    return arrayAllCoursesInfo;
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    return { message: "Error al obtener los cursos" };
  }
};

module.exports = {
  getAllDataCourses,
  getAllDataCoursesOfOneTeacher,
};
