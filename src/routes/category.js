import { Router } from "express";
const router = Router();
import { postCategory } from "./controller/category/post.category.controller";
import { getCategory } from "./controller/category/get.category.controller";
import { deleteCategory } from "./controller/category/delete.category.controller";

//*Create the categories , the input is an array of categories
router.post("/create", postCategory);

router.get("/", getCategory);

router.delete("/delete/:id", deleteCategory);

export default router;