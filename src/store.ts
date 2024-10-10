import { create  } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store { 
    order : OrderItem[]
    addToCart: ( product : Product) => void
}

export const useStore = create<Store>((set) => ({
    order : [] , 

    addToCart( product ) {
        
        const { image , categoryId , ...data } = product

        set(( state ) => ({
            order : [...state.order , { 
                ...data,
                quantity : 1 ,
                subtotal : 1 * product.price
            }]
        }))
    },
}))