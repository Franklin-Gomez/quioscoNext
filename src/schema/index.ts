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

export const OrderIdSchema = z.object({
    orderId : z.string() 
                .transform((value) => parseInt( value ))
                .refine( value => value > 0 , { message : 'Hay errores'})
})

// searchForm
export const SearchSchema = z.object({
    search : z.string()
                .trim()
                .min(1 , { message : 'La Busqueda no puede ir vacia '})
})