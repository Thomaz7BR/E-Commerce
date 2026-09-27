import { prisma } from "../../lib/prisma.js";
import { CategoryInput } from "./category.schemas.js";

export async function registerCategory(data: CategoryInput){

   return prisma.category.create({
    data: {
        name: data.name,
        
    }})
}

export async function listCategories(){
    return prisma.category.findMany();
}