import ProductsPagination from "@/app/components/products/ProductsPagination";
import ProductTable from "@/app/components/products/ProductTablet";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";


async function productCount() { 
  return await prisma.product.count()
}

async function getProducts ( page : number , pageSize : number) { 

  const skip = ( page - 1 ) * pageSize // formularia para ir saltando paginacion

  const products = await prisma.product.findMany({  

    // trae solo 10 registos como un LIMIT en SQL
    take: pageSize,

    // salta dependiendo del monto
    skip: skip,

    include : { 
      category : true
    }
  })

  return products

}

// Awaited interface
// returnType eneric
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function page( { searchParams } : { searchParams : { page : string }}) {

  console.log( searchParams.page ) // recuperar los parametros pasados por la URL
  
  const page = +searchParams.page || 1 // si no tenemos un query string en la url es por que estamos en la pagina 1
  
  const pageSize = 10
  
  const productsData = getProducts( page , pageSize)

  const totalProductsData = productCount()

  // como son dos consultas y no dependen de una de la otra, las podemos hacer al mismo tiempo
  const [ products , totalProducts ] = await Promise.all([ productsData , totalProductsData])
  

  return (
    <>
      <Heading> Administrar Productos </Heading>

      <ProductTable
        products={products}
      />

      <ProductsPagination 
        page={page}
      />
    
    </>
  )

}
