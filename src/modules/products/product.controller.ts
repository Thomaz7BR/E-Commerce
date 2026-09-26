import { NextFunction, Request, Response } from "express";
import { createProductSchema } from "./product.schemas.js";
import { registerProduct } from "./product.service.js";

export async function register(req: Request, res: Response, next: NextFunction) {
    try{
       const parsed = createProductSchema.safeParse(req.body);
       if (!parsed.success) {
         return res.status(400).json({message: "Dados inválidos", errors: parsed.error.issues});

       }
       const product = await registerProduct(parsed.data)
       return res.status(201).json(product)
    } catch(error) {

        next(error);
    }
}