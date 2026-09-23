import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
 
export const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;