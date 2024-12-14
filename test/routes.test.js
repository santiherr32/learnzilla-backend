const request = require("supertest"); // Para realizar solicitudes HTTP
const express = require("express");
const coursesRoutes = require("../src/routes/courses"); // Importar las rutas
const validateCourse = require("../src/middlewares/validateCourse"); // Importar el middleware

// Simular controladores y middleware
jest.mock("../src/middlewares/validateCourse", () => jest.fn((req, res, next) => next()));
jest.mock("../src/routes/controller/courses/get.courses.controller.js", () => ({
  getCourses: jest.fn((req, res) => res.status(200).json({ courses: [] })),
  getCourseDetail: jest.fn((req, res) =>
    res.status(200).json({ id: req.params.id, name: "Course Details" })
  ),
  getCoursesTeacher: jest.fn((req, res) =>
    res.status(200).json({ teacherId: req.params.teacherId, courses: [] })
  ),
}));
jest.mock("../src/routes/controller/courses/post.courses.controller.js", () => ({
  postCourses: jest.fn((req, res) => res.status(201).json({ message: "Course created" })),
}));
jest.mock("../src/routes/controller/courses/delete.course.controller.js", () => ({
  deleteCourse: jest.fn((req, res) =>
    res.status(200).json({ message: `Course with ID ${req.params.id} deleted` })
  ),
}));
jest.mock("../src/routes/controller/courses/update.course.controller.js", () => ({
  updateCourse: jest.fn((req, res) =>
    res.status(200).json({ message: `Course with ID ${req.params.id} updated` })
  ),
}));

// Configurar una aplicación Express para pruebas
const app = express();
app.use(express.json());
app.use("/api/courses", coursesRoutes);

describe("Tests for /api/courses", () => {
  it("GET /api/courses - should return a list of courses", async () => {
    const response = await request(app).get("/api/courses");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("courses");
    expect(Array.isArray(response.body.courses)).toBe(true);
  });

  it("POST /api/courses/create - should create a new course", async () => {
    const newCourse = { name: "New Course", description: "Description of the course" };
    const response = await request(app).post("/api/courses/create").send(newCourse);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Course created");
  });

  it("GET /api/courses/detail/:id - should return course details", async () => {
    const response = await request(app).get("/api/courses/detail/123");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "123");
    expect(response.body).toHaveProperty("name", "Course Details");
  });

  it("DELETE /api/courses/delete/:id - should delete a course", async () => {
    const response = await request(app).delete("/api/courses/delete/123");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Course with ID 123 deleted");
  });

  it("PUT /api/courses/update/:id - should update a course", async () => {
    const updatedData = { name: "Updated Course Name" };
    const response = await request(app).put("/api/courses/update/123").send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Course with ID 123 updated");
  });

  it("GET /api/courses/teacher/:teacherId - should return courses for a specific teacher", async () => {
    const response = await request(app).get("/api/courses/teacher/456");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("teacherId", "456");
    expect(response.body).toHaveProperty("courses");
    expect(Array.isArray(response.body.courses)).toBe(true);
  });
});
