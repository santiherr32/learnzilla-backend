import { Router } from "express";

const router = Router();

import { getAdmin, getAdmins } from "./controller/admin/get.admin.controller.js";
import { updateAdmin } from "./controller/admin/update.admin.controller.js";
import { deteteAdmin } from "./controller/admin/delete.admin.controller.js";

router.get("/", getAdmins);
router.get("/detail/:id", getAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deteteAdmin);

export default router;