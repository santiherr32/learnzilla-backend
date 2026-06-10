import { Router } from "express";
// Importar todos los routers;
import register from "./register.js";
import user from "./user.routes.js";
import confirmput from "./confirm_put.js";

const router = Router();

import login from "./localLogin.js";
import fakeCourses from "./mocksCourses.js";
import courses from "./courses.js";
import category from "./category.js";
import review from "./review.js";
import video from "./video.js";
import home from "./home.js";
import admins from "./admins.js";
import students from "./students.js";
import teachers from "./teachers.js";
import stripe from "./stripe.js";
import dataMaker from "./dataMaker.js";
import cv from "./cv.js";
import updatePassword from "./updatePassword.js";

// Configurar los routers
router.use("/confirmput", confirmput);
router.use("/fakecourses", fakeCourses);
router.use("/category", category);
router.use("/courses", courses);
router.use("/home", home); //In this route the front will send the id of the student and the back will give back the last five videos the user has watched
router.use("/login", login);
router.use("/register", register);
router.use("/review", review);
router.use("/admins", admins);
router.use("/students", students);
router.use("/teachers", teachers);
router.use("/video", video);
router.use("/stripe", stripe);
router.use("/cv", cv);
router.use("/password", updatePassword);
router.use("/datamaker", dataMaker); // ----> esta ruta es solo para cargar info en base de datos si hace falta

/////////////////USER////////////////
router.use("/user", user);

export default router;