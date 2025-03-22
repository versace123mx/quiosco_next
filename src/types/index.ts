import { Order, OrderProducts, Product } from "@prisma/client"
import { z } from "zod"

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}