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
  console.log( JSON.stringify( orders , null , 2))

  return (
    <>
      <Heading> Administrar Ordenes </Heading>
    </>
  )
}
