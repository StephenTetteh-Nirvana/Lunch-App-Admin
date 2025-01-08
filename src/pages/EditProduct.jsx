import { Camera, X } from 'lucide-react'
import { useNavigate , useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import Waakye from "../assets/images/waakye.jpg"

const EditProduct = () => {

  const foods = localStorage.getItem('foods') !== null ? JSON.parse(localStorage.getItem('foods')) : []
  const [closing,setClosing] = useState(false)
  const {id} = useParams()

  const navigate = useNavigate()
  const foundProduct = foods.find((p)=>p.id === id)

  const closeForm = () => {
    setClosing(true)

    setTimeout(()=>{
      setClosing(false)
      navigate(-1)
    },300)
  }

  const editProduct = () =>{
    try{
      const unsub = onSnapshot(doc(db,"Foods",selectedDay),(snapshot)=>{
        const allFoods = snapshot.data().foods || []
        setFoods(allFoods)
        localStorage.setItem('foods',JSON.stringify(allFoods))
        console.log(foods)
        setFetching(false)
      })
      return unsub;
    }catch(error){
      console.log(error)
      setFetching(false)
    }
  }

  return (
    <AnimatePresence>
      
     { !closing && (
      <div className='fixed inset-0 bg-black/40 z-50 flex justify-center items-center'>
        <motion.form onSubmit={(e)=>e.preventDefault()}
          initial={{ scale: 0.9, opacity:0 }}
          animate={{ scale: 1, opacity:1}} 
          exit={{ scale: 0.9, opacity:0 }}
          transition={{duration:0.3}}
          className='bg-white p-5 rounded-md pb-3'>
  
          <section className='flex flex-row justify-between'>
            <div className='rounded-full m-auto w-[100px] h-[100px] relative group'>
              <img 
                src={Waakye} alt='food here' 
                className='w-full h-full bg-contain rounded-full relative border border-slate-400'
              />
              <span className='absolute inset-0 bg-black/40 flex justify-center items-center 
                rounded-full opacity-0 group-hover:opacity-100 group-hover:cursor-pointer'
              >
                <Camera color='white' size={25}/>
              </span>
            </div>
  
            <div className='hover:cursor-pointer' onClick={()=>closeForm()}>
              <X/>
            </div>
          </section>
  
          <section className='w-[98%]'>
            <div>
              <label>Product</label>
              <input type='text' className='w-full py-2 pl-2 border border-slate-500 rounded-md' value={foundProduct.product}/>
            </div>
    
            <div className='mt-2'>
              <label>Price</label>
              <input type='number' className='w-full py-2 pl-2 border border-slate-500 rounded-md' value={foundProduct.price}/>
            </div>
    
            <button className='bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 
              w-full rounded-[5px] text-white py-2 mt-5 text-md'
              >
              Save Changes
            </button>
          </section>
  
        </motion.form>
      </div>
      )}
    </AnimatePresence>
  )
}

export default EditProduct