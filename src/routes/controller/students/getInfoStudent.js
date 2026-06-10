import { Student, Course } from "../../../db";

const getInfoStudent = async (id) => {
  try {
    let student = await Student.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
      include: [
        {
          model: Course,
          attributes: ["id"],
          through: {
            attributes: [], //para comprobación, siempre va
          },
        },
      ],
    });
    if (!student) {
      return null;
    }
    let arrayCoursesId = [];
    for (const course of student.courses) {
      arrayCoursesId.push(course.id);
    }
    let objStudetn = {
      id: student.id,
      name: student.name,
      lastName: student.lastName,
      email: student.email,
      avatar: student.avatar,
      role: student.role,
      courses: arrayCoursesId,
    };
    return objStudetn;
  } catch (err) {
    throw err;
  }
};

export default {
  getInfoStudent,
};