import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

//esta funcion trae los datos de la db
async function getCategories(){
    return await prisma.category.findMany()
}

const OrderSidebar = async () => {

    //aqui llamamos a la funcion getCategories para obtener las categorias
    const categories = await getCategories()

    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />
            <nav className='mt-10'>
                {categories.map(category => (
                    <CategoryIcon 
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </aside>
    )
}

export default OrderSidebar
