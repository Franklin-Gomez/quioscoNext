"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder( data : unknown) {
    
    // validacion en el servidor
    const result = OrderSchema.safeParse( data )

    if(!result.success) { 
        return {
            errors : result.error.issues
        }
    }

    // insertion
    try {
        await prisma.order.create({
            data : { 
                name : result.data.name,
                total : result.data.total,
                
                //insertion de la tabla pivot
                orderProduct : { 
                    create : result.data.order.map( product => ({
                        productId : product.id,
                        quantity : product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log( error)
    }

}