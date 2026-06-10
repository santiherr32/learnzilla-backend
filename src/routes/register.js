import { Router } from "express";
const router = Router();
import { postUser } from "./controller/register/postUser.js";
import cors from "cors";
import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));
router.use(cors());

router.post("/", postUser);

export default router;