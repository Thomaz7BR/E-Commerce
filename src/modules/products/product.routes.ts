import { Router } from "express";
import { register } from "./product.controller.js";

export const productRouter = Router();

productRouter.post("/", register);