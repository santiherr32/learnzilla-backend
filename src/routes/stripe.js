import { Router } from "express";
const router = Router();
import {
  stripePay,
  generateOrder,
} from "./controller/stripe/post.order.controller.js";
import { getOrders, getOrder } from "./controller/stripe/get.orders.controller.js";

router.post("/pay", stripePay);
router.post("/generate", generateOrder);
router.get("/orders", getOrders);
router.get("/orders/detail/:id", getOrder);

export default router;