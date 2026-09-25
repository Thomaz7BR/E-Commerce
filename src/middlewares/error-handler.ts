import type { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export function errorHandler( err: Error,  req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({ message: err.message});
    }
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor"});
}

