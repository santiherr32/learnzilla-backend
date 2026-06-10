import { Router } from "express";
const router = Router();

import dataMaker from "./mocks/bulkData.js";

router.post("/", dataMaker);

export default router;