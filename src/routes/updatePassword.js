import { Router } from "express";
import { updatePassword } from "./controller/updatePassword/update.password.controller.js";

const router = Router();

router.put("/update", updatePassword);

export default router;
