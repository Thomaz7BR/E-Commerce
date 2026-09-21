import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { RegisterInput } from "./auth.schemas.js";

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