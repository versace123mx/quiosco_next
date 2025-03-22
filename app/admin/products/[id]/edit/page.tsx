import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"
import NotFound from "./not-found"
import Heading from "@/components/ui/Heading"
import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import Link from "next/link"
import GoBackButton from "@/components/ui/GoBackButton"

//esta el la funcion que se conecta a la base de datos mediante prisma
async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        notFound()
    }

    return product
}

const EditProductsPage = async ({ params }: { params: { id: string } }) => {

    const product = await getProductById(+params.id)

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

                <GoBackButton />


            <EditProductForm>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </>
    )
}

export default EditProductsPage
