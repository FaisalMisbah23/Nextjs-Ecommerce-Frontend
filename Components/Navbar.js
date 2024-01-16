import React, { useRef } from "react";
import Link from "next/link"
import Image from "next/image";
import { AiOutlineShoppingCart} from "react-icons/ai";
import { IoCloseCircleSharp , IoBagCheckOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle , FaMinusCircle } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { FaSun,FaMoon } from "react-icons/fa6";

const Navbar = ({cart,addtoCart,removeFromCart,clearCart,SubTotal,searchProduct,cartdata,toggleDarkMode,darkMode}) => {
console.log(cartdata)

  const toggleCart = ()=>{
if(ref.current.classList.contains('translate-x-full')){
  ref.current.classList.remove('translate-x-full')
  ref.current.classList.add('translate-x-0')
}
else{
  ref.current.classList.remove('translate-x-0')
  ref.current.classList.add('translate-x-full')
}
  }
  const ref = useRef()
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 sticky top-0 bg-white z-10 shadow-xl">
      <div className="logo">
      {/* <Link href={"/"}>  <Image src="/nav.png" alt="logo" width={200} height={40} /></Link> */}
      <Link href={"/"}> <h1 className="text-indigo-500 font-bold text-2xl flex mr-4 ml-2 md:mb-2 font-sans mt-1">My <FaShop /> Shop</h1></Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-xl">
          <Link href={"/tshirts"}><li>T-Shirts</li></Link>
          <Link href={"/smartphones"}><li>Smartphones</li></Link>
          <Link href={"/jewellery"}><li>Jewellery</li></Link>
          <Link href={"/furniture"}><li>Furniture</li></Link>
        </ul>   
      </div>
      <div className="flex items-center md:ml-5">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-indigo-700 bg-white border rounded-full focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    onChange={searchProduct}
                />
  <button className="px-4 text-white bg-indigo-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      onChange={searchProduct}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
   
      <div  className="cart cursor-pointer absolute right-0 top-4 mx-5 flex justify-center">
      <Link href={'/search'}>  <CiSearch className=" text-3xl md:text-3xl sm:ml-10" /></Link>
      <div className="toggle-dark-mode" onClick={toggleDarkMode}>
      {darkMode ? <FaMoon /> : <FaSun />}
      <style jsx>{`
        .toggle-dark-mode {
          cursor: pointer;
          font-size: 26px;
        margin-top:1px}
      `}</style>
    </div>
      <Link href={'/login'}>  <MdAccountCircle className=" text-3xl md:text-3xl" /></Link>
        <AiOutlineShoppingCart onClick={toggleCart} className=" text-3xl md:text-3xl" /></div>
    <div ref={ref} className={`absolute w-72 h-[100vh] slideCart top-0 right-0 bg-indigo-200 p-10 transform transition-transform ${Object.keys(cart).length==0?'translate-x-full':'translate-x-0'}`}>
    <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
    <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-indigo-500"><IoCloseCircleSharp /></span>
    <ol className="list-decimal font-semibold">
      {Object.keys(cart).length==0 && <div className="my-4 font-normal">Your Cart is empty.</div>}
      {Object.keys(cart).map((k)=>{return <li key={k}>
      <div className="flex item my-5">
        <div className="w-2/3">{cart[k].name}</div>
        <div className="flex items-center justify-center w-1/3 text-lg">
          <FaPlusCircle onClick={()=>{addtoCart(k,1,cart[k].price,cart[k].variant,cart[k].size,cart[k].name)}} className="cursor-pointer text-indigo-500" /> <span className="mx-2">{cart[k].qty}</span>
          <FaMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].variant,cart[k].size,cart[k].name)}} className="cursor-pointer text-indigo-500" /></div>
      </div>
      </li>})}
      {/* {!data && <div className="my-4 font-normal">Your Cart is empty.</div>}
      {data.map((k)=>{return <li key={k}>
      <div className="flex item my-5">
        <div className="w-2/3">{cart[k].title}</div>
        <div className="flex items-center justify-center w-1/3 text-lg">
          <FaPlusCircle onClick={()=>{addtoCart(k.id,1,cart[k].price,cart[k].brand,cart[k].rating,cart[k].title)}} className="cursor-pointer text-indigo-500" /> <span className="mx-2">{cart[k].qty}</span>
          <FaMinusCircle onClick={()=>{removeFromCart(k.id,1,cart[k].price,cart[k].brand,cart[k].rating,cart[k].title)}} className="cursor-pointer text-indigo-500" /></div>
      </div>
      </li>})} */}

    </ol>
    
   <div className="flex">
<Link href={'/checkout'}><button className="flex mr-2  mt-16 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheckOutline className='m-1' /> Checkout</button>
</Link>
    <button onClick={clearCart} className="flex mr-2  mt-16 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"> Clear Cart</button>

   </div>
    </div>
    </div>
  );
};

export default Navbar;
