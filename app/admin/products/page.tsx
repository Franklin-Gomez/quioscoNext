import ProductTable from "@/app/components/products/ProductTablet";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";


async function getProducts () { 

  const products = await prisma.product.findMany()

  return products

}

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
