import { Camera, X, Check } from 'lucide-react'
import { useNavigate , useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import {useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import Waakye from "../assets/images/waakye.jpg"
import GlobalState from '../context/GlobalState'

const EditProduct = () => {
  const {id} = useParams()
  const {selectedDay} = useContext(GlobalState)
  const foods = localStorage.getItem('foods') !== null ? JSON.parse(localStorage.getItem('foods')) : []
  const foundProduct = foods.find((p)=>p.id === id)

  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [closing,setClosing] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)
  const navigate = useNavigate()

  const closeForm = () => {
    setClosing(true)

    setTimeout(()=>{
      setClosing(false)
      navigate(-1)
    },300)
  }

  useEffect(()=>{
    if(foundProduct.product === name && foundProduct.price === price){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  },[name,price])

  useEffect(()=>{
    setName(foundProduct.product)
    setPrice(foundProduct.price)
  },[])

  const editFood = async() => {
    if (name === "" || price === ""){
      return;
    }else{
      try{
        setLoading(true)
        const productArrayReference = doc(db,'Foods',selectedDay)
        const productArrays = await getDoc(productArrayReference)
        const productArray = productArrays.data().foods || []
        const updatedProductArray = productArray.map((item)=>{
          if(foundProduct.id === item.id){
            const updatedProduct = {
              ...item,
              id:foundProduct.id,
              product:name,
              price:price
            }
            return updatedProduct;
          }else{
            return item;
          }
        })
        await updateDoc(productArrayReference,{
          foods:updatedProductArray
        })
        setLoading(false)
        setSuccess(true)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
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
            
            { loading ?
              <div className='hover:cursor-not-allowed opacity-70'>
                <X/>
              </div>
              :
              <div className='hover:cursor-pointer' onClick={()=>closeForm()}>
                <X/>
              </div>
            }
          </section>
  
          <section className='w-[98%]'>
            <div>
              <label>Product</label>
              <input type='text' 
                className='w-full py-2 pl-2 border border-slate-500 rounded-md' 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
    
            <div className='mt-2'>
              <label>Price</label>
              <input type='number' 
                className='w-full py-2 pl-2 border border-slate-500 rounded-md' 
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </div>
            
            { loading ? 
              <button className=" mt-5 bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 
                p-2 flex justify-center items-center w-full rounded-md text-white"
              >
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </button>
              :
              success ?
              <button className=" mt-5 bg-green-500 p-2 flex flex-row justify-center items-center w-full text-sm gap-2
                rounded-md text-white cursor-auto"
              >
                <Check size={20} />
                Product updated successfully
              </button>
              :
              <button className='bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 
                w-full rounded-[5px] text-white py-2 mt-5 text-md'
                onClick={()=>editFood()}
                disabled={disabled}
                style={disabled ? {cursor:'not-allowed',opacity:0.7} : {cursor:'pointer',opacity:1}}
                >
                Save Changes
              </button>
            }
          </section>
  
        </motion.form>
      </div>
      )}
    </AnimatePresence>
  )
}

export default EditProduct