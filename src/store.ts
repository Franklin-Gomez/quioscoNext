import { create  } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store { 
    order : OrderItem[]
    addToCart: ( product : Product) => void
    increaseQuantity : ( id : Product['id'] ) => void
}

export const useStore = create<Store>((set , get ) => ({
    order : [] , 

    addToCart( product ) {
        
        const { image , categoryId , ...data } = product

        let item : OrderItem[] = []

        // comprobar si el elemento ya existe en el state
        if( get().order.find(( item ) => item.id == data.id ) ) { 

            // actualizando el elemento
            item = get().order.map( item => item.id == data.id ? { 
                ...item,
                quantity : item.quantity + 1,
                subtotal : item.price *  ( item.quantity  + 1 )
            }  : item )

        }else { 

            // si no esta en el carrito lo iremos almacenando
            item = [ ...get().order , { 
                ...data , 
                quantity : 1 , 
                subtotal : 1 *  product.price
            }]
           
        }

        // seteamos en el state
        set(() => ({
            order : item
        }))
    },

    increaseQuantity( id ) {

        let item : OrderItem[] = []
   
        // actualizando el elemento
        item = get().order.map( item => item.id == id ? { 
            ...item,
            quantity : item.quantity + 1,
            subtotal : item.price *  ( item.quantity  + 1 )
        }  : item )

        // seteamos en el state
        set(() => ({
            order : item
        }))

    }
}))