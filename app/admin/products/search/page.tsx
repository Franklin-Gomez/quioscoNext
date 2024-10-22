import Heading from "@/app/components/ui/Heading";

export default function SearchPage( { searchParams } : { searchParams : { search : string}}) {

    const search  = searchParams.search

    return (
        <>
            <Heading> Pagina de Busqueda </Heading>
        
        </>
    )
}
