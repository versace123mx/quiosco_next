import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

//este modulo es global para no tener muchas peticiones de prisma y no este constantemente renderizando lo inecesario
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma