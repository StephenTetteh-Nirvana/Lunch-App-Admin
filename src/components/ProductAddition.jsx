import React, { useContext, useEffect } from 'react'
import { CloudUpload } from 'lucide-react'
import GlobalState from '../context/GlobalState'

const ProductAddition = () => {

  const {name,setName,price,setPrice,setFinalProcess,localFoods} = useContext(GlobalState)

  const foodData = () => {
    if(name && price){
      setFinalProcess(true)
    }
  }

  useEffect(()=>{
    localFoods()
  },[])

  return (
    <main className='relative'>
      <div className="p-4 border border-slate-700 w-[150px] h-[100px] flex flex-col items-center justify-center mt-3 
        rounded-md hover:cursor-pointer"
       >
        <CloudUpload color='grey' />
        <h3 className='text-gray-500'>Upload Image</h3>
      </div>

      <form className='mt-3' onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label>Product Name</label><br/>
          <input type="text" placeholder='Enter product name...' 
            className='p-2 border border-slate-700 rounded-[4px] mt-1 placeholder:text-sm  
            outline-none focus:border-2 focus:border-sky-500' 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>

        <div className='mt-2'>
          <label>Product Price</label><br/>
          <input type="number" placeholder='Enter product price...' 
            className='p-2 border border-slate-700 rounded-sm mt-1 
            placeholder:text-sm focus:border-2 focus:border-sky-500 outline-none'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
          />
        </div>

        <div className='mt-3'>
          <button 
            className='bg-black py-3 px-8 text-white text-sm hover:bg-transparent
           hover:border-black hover:border hover:text-black transition-background duration-300'
            onClick={()=>foodData()}
           >
            ADD
          </button>
        </div>
      </form>
    </main>
  )
}

export default ProductAddition