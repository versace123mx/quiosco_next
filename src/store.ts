import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({

    order: [],
    addToOrder: (product) => {

        /**
         * product devuelve 
         * name: string;
         * id: number;
         * price: number;
         * image: string;
         * categoryId: number;
         * pero nosotros solo requerimos
         * id,name,price
         * por eso aplicamos distructuring y en data traemos los datos que requerimos
         */
        const { categoryId, image, ...data } = product

        let order: OrderItem[] = []

        if (get().order.find(item => item.id === data.id)) {

            //esta es la logica para agregar un nuevo producto al ya existente
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)

        } else {
            order = [...get().order, {
                //aqui agregamos el nuevo objeto con ...data traemos los datos que queremos y le agregamos quantity y subtotal que los requiere el type de OrderItem
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        
        //recordar que zustand tiene get para obtener datos del state y set que igual tiene acceso al state
        set((state) => ({
            //esta es la logica para agregar un nuevo producto al ya existente
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))

    },
    decreaseQuantity: (id) => {
        //Nota: la logica puede ir dentro del set o fuera del set, fuera se tendria que usar get para obtener los datos del state a manipular
        // y set para actualizar los datos del state
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        }: item)

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id )
        }))
    },
    clearOrder: () => {
        set((state) => ({
            order: []
        }))
    }


}))