import { Student, Course } from "../../../db.js";
import { getInfoStudent } from "./getInfoStudent.js";
import { getAllStudents } from "./getAllStudents.js";

const getStudents = async (req, res, next) => {
  try {
    let students = await getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener los estudiantes" };
    next(err);
  }
};

const getStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(id);
    let student = await getInfoStudent(id);
    if (!student) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }
    res.status(200).json(student);
  } catch (err) {
    err.status = 404;
    err.body = { message: "Error al obtener el estudiante" };
    next(err);
  }
};

export { getStudents,
  getStudent, };