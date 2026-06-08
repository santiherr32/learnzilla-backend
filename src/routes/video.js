import { Router } from "express";
const router = Router();
import {
  getAllVideos,
  getVideoDetail,
  getCourseVideos,
} from "./controller/video/get.video.controller";
import { postVideo } from "./controller/video/post.video.controller";
import { postRecord } from "./controller/video/post.record.controller";
import { updateVideo } from "./controller/video/update.video.controller";
import { deleteVideo } from "./controller/video/delete.video.controller";

router.get("/", getAllVideos);
router.get("/detail/:id", getVideoDetail);
router.get("/course/:courseId", getCourseVideos);
router.post("/create", postVideo);
router.post("/newrecord", postRecord); //para crear un nuevo record, recibe parámetros por query
router.put("/update/:id", updateVideo);
router.delete("/delete/:id", deleteVideo);

export default router;