import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from "next/link";

const Allproducts = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            baseURL: 'https://dummyjson.com',
            url: '/products',
          })
            .then(({ data }) => {
              setData(data.products)
            })
            .catch(err => console.dir(err))
            .finally(() => setLoading(false))
    }, [])
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">            
              {loading && "Loading..."}
              {!!data && data.length > 0 ? data.map((product) => {
                  return(
                 
            
                    <>
                    <div className="p-4 md:w-1/3">
                      <Link href={`/product/${product.id}`}>
                    <div key={product.id} className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                       <img src={product.thumbnail} width={720} height={400} alt="image" />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{product.category}</h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">{product.title}</h1>
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{product.brand}</h2>
                          <p className="leading-relaxed mb-3">{product.description}</p>
                          <div className="flex items-center flex-wrap ">
                              <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4h1v2c3.29.15 4 1.7 4 3h-1c0-1.33-1.18-2-3.5-2c-.82 0-3.5.16-3.5 2.25c0 .87 0 1.86 3.62 2.75l1.61.5c2.53.93 2.77 2.07 2.77 3.25c0 1.88-1.5 3.09-4 3.25v2h-1v-2c-3.29-.15-4-1.7-4-3h1c0 1.33 1.18 2 3.5 2c.82 0 3.5-.16 3.5-2.25c0-.87 0-1.86-3.62-2.75l-1.61-.5C7.24 11.57 7 10.43 7 9.25C7 7.37 8.5 6.16 11 6z"/> </svg>
                            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">{product.price}
                             </a>
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg  className="w-4 h-4 mr-1"  xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#F44336"/><path fill="#FFCA28" d="m24 11l3.9 7.9l8.7 1.3l-6.3 6.1l1.5 8.7l-7.8-4.1l-7.8 4.1l1.5-8.7l-6.3-6.1l8.7-1.3z"/></svg>
                              {product.rating}
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                           
                              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-1.25 0-2.125-.875T3 17V8h18v9q0 1.25-.875 2.125T18 20zM3 7V5h6V4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4v1h6v2z"/></svg>{product.stock}
                            </span>
                          </div>
                        </div>
                      </div> </Link></div> </>
                  )   
                }):(<div className="flex items-center justify-center min-h-screen bg-indigo-100">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-700 border-solid"></div>
              </div>)
              }

</div>
        </div>
     
    </section>
  )
}

export default Allproducts
