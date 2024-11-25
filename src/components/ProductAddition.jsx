import React from 'react'
import { CloudUpload } from 'lucide-react'

const ProductAddition = () => {
  
  return (
    <main>
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
            className='p-2 border border-slate-700 rounded-[4px] mt-1 placeholder:text-sm  outline-none focus:border-2 focus:border-sky-500' 
          />
        </div>

        <div className='mt-2'>
          <label>Product Description</label><br/>
          <input type="message" 
            placeholder='Enter product description...' 
            className='p-2 py-10 rounded-[4px] border border-slate-700 mt-1 placeholder:text-sm 
            placeholder:absolute placeholder:top-3 placeholder:left-2 focus:border-2 focus:border-sky-500 outline-none' 
          />
        </div>

        <div className='mt-2'>
          <label>Product Price</label><br/>
          <input type="number" placeholder='Enter product price...' className='p-2 border border-slate-700 rounded-sm mt-1 
            placeholder:text-sm focus:border-2 focus:border-sky-500 outline-none'
          />
        </div>

        <div className='mt-3'>
          <button 
            className='bg-black py-3 px-8 text-white text-sm hover:bg-transparent
           hover:border-black hover:border hover:text-black transition-background duration-300'
           >
            ADD
          </button>
        </div>
      </form>
    </main>
  )
}

export default ProductAddition