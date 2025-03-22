import { formatCurrency, getImagePath } from '@/src/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import AddProductButton from './AddProductButton'

type ProductCardProps ={
    product:Product
}
/**
 * No se le puede pasar directamente el 
 * const ProductCard = ({ product }:Product) y nos evitariamos el ProductCardProps, pero por que no se puede pasar directamente
 * por que { product } ya esta asiendo destructuring y el espera solo los campos como
 * name,id,price,image,categoryId y Product es un objeto. por lo tanto se crea un type, que sera un objeto con las caracteristicas de Product
 * 
 */
const ProductCard = ({ product }:ProductCardProps) => {

    const imagePath = getImagePath(product.image)

    return (
        <div className='border bg-white'>

            <Image 
                width={400}
                height={500}
                src={imagePath}
                alt={`Imagen de ${product.name}`}
            />
            <div className='p-5'>
                <h3 className='text-2xl font-bold'>{product.name}</h3>
                <p className='mt-5 font-black text-4xl text-amber-500'>
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton 
                    product={product}
                />
            </div>
        </div>
    )
}

export default ProductCard
