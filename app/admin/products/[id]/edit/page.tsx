import EditProductForm from "@/app/components/products/EditProductForm"
import ProductForm from "@/app/components/products/ProductForm"
import GoBackButton from "@/app/components/ui/GoBackButton"
import Heading from "@/app/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound} from "next/navigation"

async function getProductById ( id : number ) { 
    const product = await prisma.product.findUnique({
        where : { 
            id : id
        }
    })

    if(!product){
        notFound()
    }

    return product
}

export default async function EditProductsPage({ params } : { params : { id : string}}) {

    
    const productToEdit = await getProductById( +params.id )
    
    return (
        <>
            <Heading> Editar Producto : { productToEdit.name } </Heading>

            <GoBackButton/>

            <EditProductForm>
                <ProductForm
                    product={productToEdit}
                />
            </EditProductForm>
        
        </>
    )
}
