import { Router } from "express";
import {
  upload,
  uploadFiles,
  homePage,
} from "./controller/upload/files.controller.js";

const router = Router();

router.get("/", homePage);
router.post("/files", upload.single("file"), uploadFiles);

export default router;
