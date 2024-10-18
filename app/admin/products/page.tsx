import ProductTable from "@/app/components/products/ProductTablet";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";


async function getProducts () { 

  const products = await prisma.product.findMany({
    include : { 
      category : true
    }
  })

  return products

}

// Awaited interface
// returnType eneric
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function page() {

  const products = await getProducts()

  return (
    <>
      <Heading> Administrar Productos </Heading>

      <ProductTable
        products={products}
      />
    
    </>
  )

}
