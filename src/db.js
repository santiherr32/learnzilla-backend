import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";
import { parse } from "pg-connection-string";
const { DB_URL } = process.env;

const config = parse(DB_URL);

const commonSequelizeOptions = {
  dialectModule: pg,
  dialect: "postgres",
  protocol: "postgres",
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.user,
  password: config.password,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
    acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
  },
  dialectOptions: {
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
  define: {
    freezeTableName: true, // Respeta los nombres exactos de las tablas
    underscored: false, // Usa camelCase en lugar de snake_case
  },
};

const sequelize = new Sequelize(
  process.env.NODE_ENV === "production"
    ? commonSequelizeOptions
    : {
      ...commonSequelizeOptions,
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);
import AdminModel from "./models/Admin.js";
import CategoryModel from "./models/Category.js";
import CourseModel from "./models/Course.js";
import CvModel from "./models/Cv.js";
import DatamakerModel from "./models/DataMaker.js";
import OrderModel from "./models/Order.js";
import RecordsModel from "./models/Records.js";
import ReviewModel from "./models/Review.js";
import StudentModel from "./models/Student.js";
import TeacherModel from "./models/Teacher.js";
import VideoModel from "./models/Video.js";

const modelDefiners = [
  AdminModel,
  CategoryModel,
  CourseModel,
  CvModel,
  DatamakerModel,
  OrderModel,
  RecordsModel,
  ReviewModel,
  StudentModel,
  TeacherModel,
  VideoModel,
];

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
export const {
  Category,
  Course,
  Student,
  Teacher,
  Video,
  Review,
  Admin,
  Order,
  Cv,
  Datamaker,
  Records
} = sequelize.models;

// Aca vendrian las relaciones

//?Primero vienen las relaciones de muchos a muchos
//*Relación entre Students y Courses
Student.belongsToMany(Course, { through: "Student_Course" });
Course.belongsToMany(Student, { through: "Student_Course" });
//*Relación entre Categories y Courses
Course.belongsToMany(Category, {
  through: "Course_Category",
  as: "Categories",
  attributes: [],
  timestamps: false,
});
Category.belongsToMany(Course, {
  through: "Course_Category",
  as: "Courses",
  attributes: [],
  timestamps: false, // Evita incluir createdAt y updatedAt automáticamente
});
//Relación entre historial y estudiantes
// Student.belongsToMany(Records, { through: "Student_Records" });
// Records.belongsToMany(Student, { through: "Student_Records" });

//?Ahora vienen las relaciones de uno a muchos
//?Relación entre Teachers y Courses
// Course.belongsTo(Teacher, { as: "profesor" });
Teacher.hasMany(Course, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKteacherID",
  },
});
Course.belongsTo(Teacher, { foreignKey: "FKteacherID", as: "Teacher" });

//?Relación entre Courses y Videos
Course.hasMany(Video, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKcourseID",
  },
});
Video.belongsTo(Course);

//? Relación entre Estudiante, Review y Curso
//? Relación entre Estudiante y Review
// Student.hasMany(Review)
// Review.belongsTo(Student)
Student.hasMany(Review, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKstudentID",
  },
});
Review.belongsTo(Student);

//? Relación entre Cursos y Review
// Course.hasMany(Review)
// Review.belongsTo(Course)
Course.hasMany(Review, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKcourseID",
  },
  as: "Reviews",
});
Review.belongsTo(Course, { foreignKey: "FKcourseID" });

// //? Relación entre Estudiante, y Curso
// Student.hasMany(Order, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: "FKstudentID",
//   },
// });
// Order.belongsTo(Student);

export const conn = sequelize; // para importart la conexión
