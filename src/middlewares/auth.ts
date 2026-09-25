import type { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido"});
    }
    const [, token] = authHeader.split(" ");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as  unknown as {
            sub: number;
            role: string;
        };
        req.user = {id: payload.sub, role: payload.role};
        next();
    } catch(error)  {
        return res.status(401).json({ message: "Token é inválido ou expirado"});
    }
}