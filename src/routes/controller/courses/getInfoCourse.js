//Función para obtener la infomación de un curso
const { Category, Course, Review, Teacher, conn } = require("../../../db.js");

const getInfoCourse = async (name) => {
  try {
    const course = await Course.findOne({
      where: { name },
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
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
          required: false,
          as: "Categories",
        },
        {
          model: Review,
          attributes: [],
          as: "Reviews",
          required: false,
        },
        {
          model: Teacher,
          attributes: ["name", "lastName"],
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

    if (!course) {
      throw new Error("Curso no encontrado");
    }

    return {
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
      img: course.img,
      teacherName: `${course.Teacher.name} ${course.Teacher.lastName}`,
      categories: course.Categories.map((cat) => cat.name),
      meanReview: course.dataValues.meanReview || 0,
    };
  } catch (err) {
    console.error("Error en getInfoCourse:", err.message);
    throw new Error("Error al obtener información del curso");
  }
};

module.exports = {
  getInfoCourse,
};
