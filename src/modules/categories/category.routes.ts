import { Router } from "express";
import { register } from "./category.controller.js";

export const categoryRouter = Router();

categoryRouter.post("/", register);