'use client'

import { OrderWithProducts } from "@/src/types";
import Logo from "../components/ui/Logo";
import useSWR from "swr";
import LatestOrderItem from "../components/ui/LatestOrderItem";

export default function OrdersPage() { 

    const url = '/orders/api'
    const fetcher = () => fetch(url).then( res => res.json() ).then( data => data )
    
    const { data , isLoading } = useSWR<OrderWithProducts[]>( url , fetcher, { 
        refreshInterval: 60000,
        revalidateOnFocus: false
    })
  
    if( isLoading ) return 'Cargando...'

    if ( data ) return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black"> Ordenes Listas </h1>

            <Logo />

            { data.length >= 1 ? ( 
                <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
                    { data.map( order => ( 
                        <LatestOrderItem
                            key={ order.id }
                            order={ order }
                        />
                    ))}
                </div>
            ) : <p className="text-center my-10 "> No hay ordenes listas </p>}
        </>
    )
}