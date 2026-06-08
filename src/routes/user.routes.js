import { Router } from "express";

const router = Router();

import { loginGoogle } from "./controller/user.controller";

//// routes ////

router.post("/loginGoogle", loginGoogle);

export default router;