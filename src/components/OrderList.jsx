import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Profile from "../assets/images/profile.jpg"
import PersonnelOrders from './PersonnelOrders'

const OrderList = ({departmentID,showOrders,setShowOrders}) => {
  const localPersonnelData = localStorage.getItem('personnelData') !== null ? JSON.parse(localStorage.getItem('personnelData')) : []

  const [closing,setClosing] = useState(false)
  const [personnels,setPersonnels] = useState([])
  const [viewOrders,setViewOrders] = useState(false)
  const [personnelData,setPersonnelData] = useState([])
  const [loading,setLoading] = useState(false)

  const closePopUp = () => {
    setClosing(true)
    setTimeout(()=>{
      setClosing(false)
      setShowOrders(false)
    },200)
  }

  //Fetch all personnels and their respective data
  const fetchPersonnels = async(departmentID) => {
    try{
      setLoading(true)
      const docRef = doc(db,'Departments',departmentID)
      const docData = await getDoc(docRef) 
      if(docData.exists()){
        const allPersonnels = docData.data().personnels
        setPersonnels(allPersonnels)
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }   
  }

  useEffect(()=>{
    if(departmentID){
      fetchPersonnels(departmentID)
    }
  },[departmentID])

  //Pass down individual personnel data to a component
  const passDownPersonnelOrders = (personnelEmail) => {
    personnels.forEach((item)=> {
      if(item.email === personnelEmail){
        setPersonnelData(item)
        localStorage.setItem('personnelData',JSON.stringify(item))
        setViewOrders(true)
      }
    })
  }

  return (
    <AnimatePresence>
      {showOrders && !closing && (
        <motion.div className=' fixed bg-black/40 inset-0 w-full p-5 h-full'>
          <motion.div 
            className='bg-white p-5 w-full h-[70vh] rounded-md overflow-y-auto'
            initial={{ scale: 0.9, opacity:0 }}
            animate={{ scale: 1, opacity:1}} 
            exit={{ scale: 0.9, opacity:0 }}
            transition={{duration:0.3}}
            >
            <div className='flex flex-row justify-between'>
              <h1 className='text-2xl italic'>This week's orders</h1>
              <X onClick={()=>closePopUp()} cursor='pointer'/>
            </div>

            <ul className='grid grid-cols-3 mt-4'>
              <li className='list-none text-md font-semibold'>User</li>
              <li className='list-none text-md font-semibold'>Name</li>
              <li className='list-none text-md font-semibold'>Order</li>
            </ul>

            { loading ?
              <button className="flex items-center justify-center mt-5 w-full mb-5">
                <div className="w-10 h-10 border-2 mt-5 border-black border-t-transparent rounded-full animate-spin"></div> 
              </button>
            :  
              personnels.length > 0 && personnels.map((personnel)=>(
                <div key={personnel.email} className='grid grid-cols-3 mt-2 py-3 w-full'>
                  <img src={Profile} alt='user' className='w-[40px] h-[40px] rounded-full object-cover bg-cover'/>
                  <p className='list-none'>{personnel.firstName}</p>
                  <button className='list-none bg-white border border-slate-300 shadow-sm 
                    cursor-pointer p-2 text-sm text-black rounded-md hover:bg-slate-100 max-w-[40%]'
                    onClick={()=>passDownPersonnelOrders(personnel.email)}
                  >
                    View Order
                  </button>
                </div>
              ))
            }
            {viewOrders && <PersonnelOrders personnelData={personnelData} setViewOrders={setViewOrders}/>}
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

export default OrderList