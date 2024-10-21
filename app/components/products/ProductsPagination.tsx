import Link from 'next/link'
import React from 'react'

type ProductsPaginationProps = { 
    page : number
    totalPage : number
}


export default function ProductsPagination({ page , totalPage } : ProductsPaginationProps) {
    return (
        <nav className='flex justify-center py-10'>

            { page > 1 && 
            
                <Link
                    href={`/admin/products?page=${ page - 1 }`}
                    className='bg-white px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                > &laquo; </Link>
            
            }

            
            { page < totalPage &&
            
                <Link
                    href={`/admin/products?page=${ page + 1 }`}
                    className='bg-white px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                > &raquo; </Link>
            
            }


        </nav>
    )
}
