import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductTablet";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts ( searchTerm : string ) { 

    const products = await prisma.product.findMany({
        where: { 
            name: { 
                contains : searchTerm,
                mode : 'insensitive', // ignorar las mayusculas
            }
        },
        include: {
            category: true
        }
    })

    return products

}

export default async function SearchPage( { searchParams } : { searchParams : { search : string}}) {

    const products = await searchProducts( searchParams.search )

    return (
        <>

            <Heading> Resultado de Busqueda : {searchParams.search} </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">

                <ProductSearchForm/>

            </div>

            { products.length ? ( 
                
                <ProductTable
                    products={products}
                /> 

            ) : <p className="text-center text-lg mt-5 font-bold" >No hay resultado</p>}

        
        </>
    )
}
