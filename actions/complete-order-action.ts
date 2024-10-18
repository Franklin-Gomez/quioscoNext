'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export const completeOrder = async ( formData : FormData ) => { 
    
    //console.log( formData.get('order_id'))

    const data = { 
        orderId : formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse( data )

    if( result.success ) { 
        
        try {
            
            await prisma.order.update({
                where: { 
                    id : result.data.orderId
                },
    
                data : { 
                    status : true,
                    orderReadyAt : new Date( Date.now())
                }
            })

            revalidatePath('/admin/order')
    
        } catch (error) {
            console.log( error )
        }

    }

}