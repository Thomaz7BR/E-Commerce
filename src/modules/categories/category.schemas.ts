import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório").max(100, "Categoria muito longa"),
   
});

export type CategoryInput = z.infer<typeof createCategorySchema>;