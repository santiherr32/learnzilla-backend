import { Router } from "express";
import { route } from "./confirm_put.js";
import { updatePassword } from "./controller/updatePassword/update.password.controller.js";

const router = Router();

router.put("/update", updatePassword);

export default router;
