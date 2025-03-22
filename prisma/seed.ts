import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    try {
        await prisma.category.createMany({
            data:categories
        })
        await prisma.product.createMany({
            data:products
        })
    } catch (error) {
        console.log(error)
    }
}
//Esto lo recomienda hacer prisma desde su doc, es por si se ingresan los datos se desconecte de la db
//si no se logran insertar entonces mande un mensaje a consola y luego desconecte de la db
main()
    .then( async () => {
        await prisma.$disconnect()
    })
    .catch( async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })