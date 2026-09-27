import { Router } from "express";
import { register } from "./category.controller.js";
import { authenticate, requireAdmin } from "../../middlewares/auth.js";

export const categoryRouter = Router();

categoryRouter.post("/", authenticate, requireAdmin, register);