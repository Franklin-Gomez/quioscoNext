import { prisma } from "@/src/lib/prisma"

export async function GET () { 

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
    
    return Response.json(orders)
}