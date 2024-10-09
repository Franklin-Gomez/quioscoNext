import { prisma } from "@/src/lib/prisma"

async function getProducts ( category : string ) { 
    const products = await prisma.product.findMany({
        where : { 
            category : { 
                slug  : category 
            }
        }
    })

    return products
}



export default  async function OrderPage({ params } : { params : { category : string}}) {

    const product = await getProducts( params.category )

    console.log( product )

    return (
        <div>
            OrderPage
        </div>
    )
}
