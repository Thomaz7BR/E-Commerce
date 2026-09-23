import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { RegisterInput } from "./auth.schemas.js";
import type { LoginInput } from "./auth.schemas.js";

export async function registerUser(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: {email: data.email},
    });

    if (existingUser) {
        throw new AppError("E-mail já cadastrado", 409);
    }
    const passwordHash = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: passwordHash,
        },
        select: { id: true, name: true, email: true, role: true, createAt: true},
    });


}

export async function loginUser(data: LoginInput) {
    const existingUser = await prisma.user.findUnique({
        where: {email: data.email},
    });

    if (!existingUser) {
        throw new AppError("Credenciais inválidas", 401);
    }
   const passwordSame = await bcrypt.compare(data.password, existingUser.password)
    if (!passwordSame) {
        throw new AppError("Credenciais inválidas", 401)
    }

   const token = jwt.sign(
    { sub: existingUser.id, role: existingUser.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d"}
   );
   return {
    user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
    },
    token,
   };
}