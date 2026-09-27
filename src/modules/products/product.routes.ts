import { Router } from "express";
import { list, register } from "./product.controller.js";
import { authenticate, requireAdmin } from "../../middlewares/auth.js";

export const productRouter = Router();

productRouter.post("/", authenticate, requireAdmin,register);
productRouter.get("/", list);