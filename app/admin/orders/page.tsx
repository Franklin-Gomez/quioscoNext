import OrderCard from "@/app/components/order/OrderCard"
import Heading from "@/app/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getPendingOrders(){

  const orders = await prisma.order.findMany({

    // nos traemos los que tengan status en false
    where: { 
      status: false
    },

    // nos traremos la informacion de la relacion con los productos
    include :  { 
      orderProduct : { 
        include : { 
          product : true
        }
      }
    }

  })

  return orders

}

export default async function page() {

  const orders = await getPendingOrders()
  //console.log( JSON.stringify( orders , null , 2))

  return (
    <>
      <Heading> Administrar Ordenes </Heading>

      { orders.length ?
        
        ( 
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">

            { orders.map( order => ( 
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}

          </div>
        ) 
          : 
        <p className="text-center">No hay ordenes Pendientes</p> 
      
      }
    </>
  )
}
