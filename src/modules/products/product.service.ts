import { AppError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { ProductInput } from "./product.schemas.js";

export async function registerProduct(data: ProductInput) {
   const categoryExists = await prisma.category.findUnique({
    where: {id: data.categoryId},
   })

   if (!categoryExists){
    throw new AppError("Categoria não encontrada", 404);
   }

    return prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            stock: data.stock,
            imageUrl: data.imageUrl,
        

        }
    })
}


export async function listProducts(){
    return prisma.product.findMany({
    include: {category: true},
            
    });
}