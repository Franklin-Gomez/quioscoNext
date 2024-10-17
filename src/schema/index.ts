import { z } from 'zod'

export const OrderSchema = z.object({
    name : z.string()
        .min(1 , 'Tu Nomber es Obligatorio'),

    total : z.number()
        .min(1 , 'hay errores en la orden'),
        
    order : z.array( z.object({
        name: z.string(),
        id: z.number(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})