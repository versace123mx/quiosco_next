"use client"
import Image from "next/image"
import { Category } from "@prisma/client"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}
const CategoryIcon = ({ category }: CategoryIconProps) => {


    const params = useParams<{ category: string }>()//recorre los parametros de la url y los guarda en params
    const selectedCategory = params.category // selecciona la categoria de los parametros
    
    return (
        <div
            className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b
                ${category.slug === selectedCategory ? "bg-amber-400" : ""}
                `}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`imagen de ${category.slug}`}
                />
            </div>
            <Link
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >
                {category.name}
            </Link>
        </div>
    )
}

export default CategoryIcon
