import { NextFunction, Request, Response } from "express";
import { createCategorySchema } from "./category.schemas.js";
import { registerCategory } from "./category.service.js";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
     const parsed = createCategorySchema.safeParse(req.body);
     if (!parsed.success){
        return res.status(400).json({message: "Dados inválidos", errors: parsed.error.issues});
     }
    const category = await registerCategory(parsed.data);
    return res.status(201).json(category);
  } catch(error) {

     next(error);

  }
  
}