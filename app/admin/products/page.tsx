import ProductSearchForm from "@/components/products/ProductSearchForm"
import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"


//metodo para obtener los productos
async function getProducts(page: number, pageSize: number) {

    const skipe = (page - 1) * pageSize

    const products = await prisma.product.findMany({
        take: pageSize,
        skip: skipe,
        include: {
            category: true
        }
    })
    return products
}

//metodo para obtener el numero de registros que hay para hacer el calculo de la paginacion
async function productCount() {
    return await prisma.product.count()
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {

    const page = +searchParams.page || 1
    const pageSize = 10

    //validamos que en la url la page no sea menor a 1 osea que alguien la manipule
    if(page < 0)redirect('/admin/products')

    const productsData = getProducts(page, pageSize)
    const totalProductsData = productCount()
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)

    //validamos que la url no sea manipulada con numero mayores al total de paginas existentes
    if(page > totalPages)redirect('/admin/products')


    return (
        <>
            <Heading>Administrar Productos</Heading>
            
            <div
                className="flex flex-col lg:flex-row lg:justify-between gap-5"
            >
                <Link
                    href={'/admin/products/new'}
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
                >
                    Crear Product
                </Link>

                <ProductSearchForm />

            </div>

            <ProductTable
                products={products}
            />
            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />
        </>
    )
}

export default ProductsPage
