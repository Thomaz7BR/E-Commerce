import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "./auth.schemas.js";
import { registerUser } from "./auth.service.js";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = registerSchema.safeParse(req.body);

        if (!parsed.success) {
            return res
            .status(400)
            .json({message: "Dados inválidos", errors: parsed.error.issues});
        }
        const user = await registerUser(parsed.data);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}