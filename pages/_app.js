import "../styles/globals.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [cart, setCart]=useState({})
  const [subTotal,setSubTotal]=useState(0)

 useEffect(()=>{
  try {
    if(localStorage.getItem("cart")){
      setCart(JSON.parse(localStorage.getItem("cart")))
      saveCart(JSON.parse(localStorage.getItem("cart")))
    }
  } catch (error) {
    console.error("error")
    localStorage.clear
  }
 },[])

  const saveCart =(newCart)=>{
    localStorage.setItem("cart",JSON.stringify(newCart))
    let subt=0;
    let keys=Object.keys(cart)
    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }
  const addtoCart=(itemCode,qty,price,variant,size,name)=>{
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode].qty= newCart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty : 1,name,size,variant,price}

    }
    setCart(newCart);
    saveCart(newCart)
  }

  const clearCart=()=>{
    setCart({})
    saveCart({})
  }

  const removeFromCart=(itemCode,qty,price,variant,size,name)=>{
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
   if(newCart[itemCode]["qty"]<=0){
    delete newCart[itemCode]
   } 
    setCart(newCart);
    saveCart(newCart)
  }

  // for search
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const[products, setProducts]=useState(null)
  const[query,setquery]=useState(null)
  const[category,setCategories]=useState(null)
  const[categorydata,setCategoriesdata]=useState(null)


  const searchProduct=(e)=>{
      setquery(e.target.value)
      setCategories(null)
      setCategoriesdata(null);
  }
  const withCategory=(e)=>{
      setCategories(e.target.value)
      setquery(null)
      setProducts(null);
  }
  console.log(category)
  
  useEffect(() => {
      if (category) {
        axios({
          method: "GET",
          baseURL: "https://dummyjson.com/",
          url: `/products/category/${category}`,
        })
          .then((response) => {
            setCategoriesdata(response.data.products);
          })
          .catch((error) => console.dir(error));
      }
    }, [category]);

 useEffect(() => {
if (query) {
  axios({
    method: "GET",
    baseURL: "https://dummyjson.com/",
    url: `/products/search?q=${query}`,
  })
    .then((response) => {
      setProducts(response.data.products);
    })
    .catch((error) => console.dir(error));
}
}, [query]);

  useEffect(() => {
      setLoading(true)
      axios({
          method: 'GET',
          baseURL: 'https://dummyjson.com',
          url: '/products/categories',
        })
          .then(({ data }) => {
            setData(data)
          })
          .catch(err => console.dir(err))
          .finally(() => setLoading(false))
  }, [])


  // for cart
  const [cartdata, setcartData] = useState(null);
useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'https://dummyjson.com',
      url: `/products/${slug}`,
    })
      .then(({ data }) => {
        setcartData(data);
      })
      .catch(err => console.dir(err))
      .finally(() => setLoading(false));
  }, []);

  const router = useRouter();
  const { slug } = router.query;

// for dark-light mode 

//  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   // Check the user's preferred color scheme
  //   const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   setDarkMode(prefersDarkMode);
  // }, []);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (darkMode === false) {
      document.body.style.backgroundColor = 'black';
      setDarkMode(true);
    }
    if (darkMode === true) {
      document.body.style.backgroundColor = 'white';
      setDarkMode(false);
    }
  };
  

  useEffect(() => {
    // Apply dark mode styles to the body
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

 


  return (
    <>
      <Navbar saveCart={saveCart} removeFromCart={removeFromCart} clearCart={clearCart} addtoCart={addtoCart} subTotal={subTotal} cart={cart}
      loading={loading} setLoading={setLoading} 
      data={data} setData={setData} 
      products={products} setProducts={setProducts} 
      query={query} setquery={setquery} 
      category={category} setCategories={setCategories} 
      categorydata={categorydata} setCategoriesdata ={setCategoriesdata }
      searchProduct={searchProduct} withCategory={withCategory}
      cartdata={cartdata} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      {/* for Component */}
      <Component  saveCart={saveCart} removeFromCart={removeFromCart} clearCart={clearCart} addtoCart={addtoCart} subTotal={subTotal} cart={cart}
                  loading={loading} setLoading={setLoading} 
                  data={data} setData={setData} 
                  products={products} setProducts={setProducts} 
                  query={query} setquery={setquery} 
                  category={category} setCategories={setCategories} 
                  categorydata={categorydata} setCategoriesdata ={setCategoriesdata }
                  searchProduct={searchProduct} withCategory={withCategory}  {...pageProps} />
      <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        {query?(<h1 className="text-3xl mb-5 font-bold">Your results for {query} are: </h1>):null}
        <div className="flex flex-wrap -m-4">            
              {loading && "Loading..."}
              {!!products && products.length > 0 ? products.map((product) => {
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
                }):(null)
              }

</div>
        </div>
     
    </section>
      <Footer />
    </>
  );
}

export default MyApp;
