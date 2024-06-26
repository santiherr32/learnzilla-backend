const { Course, Teacher } = require("../../../db.js");
const { getCategoryId, getCategoryNames } = require("../getCategoryId");

const postCourses = async (req, res) => {
  //*email is of the teacher, category must be an array
  let { name, description, email, img, price, category, role } = req.body;
  if (!img) img = "https://placeimg.com/240/120/tech";
  try {
    if (role && role === "admin") {
      category = await getCategoryNames(category);
    }
    let findCourse = await Course.findOne({
      where: { name },
    });
    if (!findCourse) {
      const FK = await Teacher.findOne({
        //Busca el id del teacher
        where: {
          email: email,
        },
      });
      const courseCreated = await Course.create({
        //Crea el curso
        name,
        description,
        price,
        img,
        FKteacherID: FK.id,
      });
      const categoryID = await getCategoryId(category); //Busca el id de las categorias
      // console.log('category id in post course:',categoryID);
      courseCreated.addCategory(categoryID); //Agrega las categorias al curso
      res.status(200).send({ message: "El curso se ha creado correctamente" });
    } else {
      res.status(400).send({ message: "El curso ya existe" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

module.exports = {
  postCourses,
};
