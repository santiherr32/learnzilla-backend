import { Router } from "express";

const router = Router();

import { getAdmin, getAdmins } from "./controller/admin/get.admin.controller";
import { updateAdmin } from "./controller/admin/update.admin.controller";
import { deteteAdmin } from "./controller/admin/delete.admin.controller";

router.get("/", getAdmins);
router.get("/detail/:id", getAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deteteAdmin);

export default router;