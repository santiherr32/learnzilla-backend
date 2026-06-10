import { Course } from "../../../db.js";

import { filterCategory } from "../middleware.js";
import { getCoursesByQuery } from "./getCoursesByQuery.js";
import {
  getAllDataCourses,
  getAllDataCoursesOfOneTeacher,
} from "./getAllDataCourses.js";
import { getInfoCourse } from "./getInfoCourse.js";

const getAllCourses = async (req, res, next) => {
  try {
    let getAllCourses = await getAllDataCourses(); //Busca todos los cursos
    // console.log("GET ALL COURSES", getAllCourses)
    res.json(getAllCourses); //Envía el array con todos los cursos
    // getInfoCourse(name)
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  const { category, order } = req.query;
  if (category === undefined && order === undefined) {
    getAllCourses(req, res, next);
  } else {
    getCoursesByQuery(req, res, category, order);
  }
};

const getCourseDetail = async (req, res, next) => {
  //Obtiene el detalle de un curso
  const { id } = req.params;
  try {
    let name;
    try {
      name = await Course.findOne({
        //Busca el curso por id
        where: {
          id: id,
        },
      });
    } catch (error) {
      next(error);
      return;
    }
    const detail = await getInfoCourse(name.name); //Obtiene el detalle del curso
    if (!detail) {
      return res.status(404).send({ message: "Curso no encontrado" }); //Si no encuentra el curso, retorna un error
    }
    res.json(detail); //Envía el detalle del curso
  } catch (error) {
    next(error);
  }
};

const getCoursesTeacher = async (req, res, next) => {
  const { teacherId } = req.params;
  try {
    const courses = await getAllDataCoursesOfOneTeacher(teacherId);
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// const getCourseById = async (id) => {
//   try {
//     const courseById = await Course.findByPk(id.toUpperCase());
//     // console.log(courseById);
//     return courseById;
//   } catch (error) {
//     throw error;
//   }
// };

export { getCourses, getCourseDetail, getCoursesTeacher };
