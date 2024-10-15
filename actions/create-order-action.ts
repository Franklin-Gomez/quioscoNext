"use server"

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
        
    } catch (error) {
        console.log( error)
    }

}