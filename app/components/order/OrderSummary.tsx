"use client"

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"

export default function OrderSummary() {

    // leemos el state
    const order = useStore( ( state ) => state.order )
    const total = useMemo(() =>  order.reduce( ( acc , item ) => acc + ( item.price * item.quantity ) , 0) ,[order] ) 

    const handleCreateOrder = ( formData : FormData) => { 
        // validaciones en el cliente 
        console.log( 'desde el handler ')
        console.log( formData.get('name'))

        // ejecutariamos el use Server
        createOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            { order.length === 0 ? 
            
                <p className="text-center my-10"> El carrito esta vacio </p>
                
                :

                (
                    <div className="mt-5">
                        { order.map( item => ( 
                            <ProductDetails
                                key={item.id}
                                item={item}
                            />
                        ))}

                        <p className="text-2xl mt-20 text-center">

                            Total a pagar : {''}

                            <span className="font-bold">{formatCurrency( total )}</span>

                        </p>

                        <form 
                            action={handleCreateOrder}
                            className="w-full m-10 space-y-5"
                            
                        >

                            <input 
                                type="text" 
                                placeholder="Tu Nombre"
                                className="bg-white border border-gray-100 p-2 w-full"
                                name="name"
                            />

                            <input
                                type="submit"
                                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                                value='Confirmar Peido'
                            />

                        </form>

                    </div>
                )

            }
            
        </aside>
    )
}
