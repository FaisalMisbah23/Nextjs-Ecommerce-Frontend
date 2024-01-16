import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';


const Post = ({ addtoCart }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const[alert,setAlert]=useState(true)
const closeAlert=()=>{
    setAlert(false)
  }

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      baseURL: 'https://dummyjson.com',
      url: `/products/${slug}`,
    })
      .then(({ data }) => {
        setData(data);
      })
      .catch(err => console.dir(err))
      .finally(() => setLoading(false));
  }, []);

  const router = useRouter();
  const { slug } = router.query;
  const [service, setService] = useState();
  const [pin, setPin] = useState();

  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode');
    let pinJson = await pins.json();
    console.log(pin, pinJson);
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const onchangePin = e => {
    setPin(e.target.value);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      {data && (
        <>
{alert && (
  <div className="bg-indigo-900 text-center py-4 lg:px-4">
    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
      <span className="font-semibold mr-2 text-left flex-auto">{data.discountPercentage}% Off on this {data.title}. Grab this offer before it expires.</span>
      <svg onClick={closeAlert} className="fill-current h-6 w-6 text-white-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </div>
  </div>
)}
          <div  key={data.id} className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="img" className="lg:w-1/2 w-full lg:h-auto object-cover object-top px-12 rounded" src={data.thumbnail}/>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.category} </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.title}</h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.brand} </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">{data.rating}</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed"> {data.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
              </div>
              {/* <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div> */}
            </div> 
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${data.price} </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
              <button onClick={()=>addtoCart(slug,1,500,"Red","M","Wear the Code")} className="flex ml-3 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
            <div className="pin flex mt-6 space-x-3">
              <input onChange={onchangePin} type='text'className="text-xl text-gray-900 border-2 border-gray-400 font-bold" placeholder='Enter your Pincode'/>
              <button onClick={checkServiceability} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
              </div>
            {(!service && service !=null ) && <div className="mt-6 text-sm text-red-700">
              Sorry, we don't deliver to this pincode yet.
            </div>}
          {(service && service !=null) && <div className="mt-6 text-sm text-green-700">
            Yes, this pincode is serviceable.
          </div>}
           
          </div>
        </div>
      </div>
      <div className="h-100 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
      {data.images && data.images.length > 0 ? (
  data.images.map((image, index) => (
    <img key={index} src={image} alt={`Image ${index + 1}`} />
  ))
) : (
  <p>No images available</p>
)}

      </Carousel>
    </div>
    
    {/* <div className="grid gap-4">
        <div>
          <img className="h-auto max-w-full rounded-lg" src={data.thumbnail} alt="" />
        </div>
        <div className="grid grid-cols-5 gap-4">
    {data.images && data.images.length > 0 ? (
  data.images.map((image, index) => (
    <>
 
          <div key={index}>
            <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
          </div>
       </>
  ))
) : (
  <p>No images available</p>
)}
 </div>
      </div> */}
        </>
      )}
      {!data && (<div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-700 border-solid"></div>
    </div>)}
    </section>
  );  
};

export default Post;
