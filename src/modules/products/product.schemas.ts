import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório").max(100, "Nome muito longo"),
    description: z.string().optional(),
    price: z.number().positive({ message: "O preço do produto precisa ser maior que zero"}),
    categoryId: z.number().int().positive({ message: "Categoria inválida" }),
    stock: z.number().int().min(0, "Estoque não pode ser negativo").optional(),
    imageUrl: z.url("Url de imagem inválida").optional(),
});

export type ProductInput = z.infer<typeof createProductSchema>;