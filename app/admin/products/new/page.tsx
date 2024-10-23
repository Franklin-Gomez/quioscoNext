import AddProductForm from "@/app/components/products/AddProductForm";
import ProductForm from "@/app/components/products/ProductForm";
import Heading from "@/app/components/ui/Heading";
import ToastNotification from "@/app/components/ui/ToastNotification";

export default function CreateProductPage() {
  return (
    <>
      <Heading> Nuevo Producto </Heading>

      <AddProductForm>

        <ProductForm/>

      </AddProductForm>

      <ToastNotification/>

    </>
  )
}
