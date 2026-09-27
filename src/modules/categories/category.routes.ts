import { Router } from "express";
import { list, register } from "./category.controller.js";
import { authenticate, requireAdmin } from "../../middlewares/auth.js";

export const categoryRouter = Router();

categoryRouter.post("/", authenticate, requireAdmin, register);
categoryRouter.get("/", list);