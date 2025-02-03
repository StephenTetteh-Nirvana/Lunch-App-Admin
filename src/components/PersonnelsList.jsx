import React, { useEffect, useState } from 'react'
import { X, MessageCircleWarning, EyeIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Profile from "../assets/images/profile.jpg"

const PersonnelsList = ({departmentID,showPersonnels,setShowPersonnels}) => {
  
  const [closing,setClosing] = useState(false)
  const [personnels,setPersonnels] = useState([])
  const [loading,setLoading] = useState(false)

  const closePopUp = () => {
    setClosing(true)
    setTimeout(()=>{
      setClosing(false)
      setShowPersonnels(false)
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


  return (
    <AnimatePresence>
      {showPersonnels && !closing && (
        <motion.div className=' fixed bg-black/40 inset-0 w-full p-5 h-full'>
          <motion.div 
            className='bg-white p-5 w-full h-[70vh] rounded-md overflow-y-auto'
            initial={{ scale: 0.9, opacity:0 }}
            animate={{ scale: 1, opacity:1}} 
            exit={{ scale: 0.9, opacity:0 }}
            transition={{duration:0.3}}
            >
            {personnels.length > 0 && (
            <>
              <div className='flex flex-row justify-end'>
                <X onClick={()=>closePopUp()} cursor='pointer'/>
              </div>

              <ul className='grid grid-cols-3 mt-4'>
                <li className='list-none text-md font-semibold'>User</li>
                <li className='list-none text-md font-semibold'>Name</li>
                <li className='list-none text-md font-semibold'>Date Created</li>
              </ul>
            </>
            )}

            { loading ?
              <button className="flex items-center justify-center mt-5 w-full mb-5">
                <div className="w-10 h-10 border-2 mt-5 border-black border-t-transparent rounded-full animate-spin"></div> 
              </button>
            :  
              personnels.length > 0 ? personnels.map((personnel)=>(
                <div key={personnel.email} className='grid grid-cols-3 mt-2 py-3 w-full'>
                  <img src={Profile} alt='user' className='w-[40px] h-[40px] rounded-full object-cover bg-cover'/>
                  <p className='list-none'>{personnel.firstName + ' ' + personnel.lastName}</p>
                  <p className='list-none'>{personnel.createdAt}</p>
                </div>
              ))

              :
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <MessageCircleWarning color='grey' size={80}/>
                <h2 className='font-semibold mt-3'>No personnels for this department yet.</h2>
                <button 
                  className='border border-slate-400 mt-3 p-1 px-3 rounded-md' 
                  onClick={()=>closePopUp()}
                >
                  Close
                </button>
              </div>
            }
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

export default PersonnelsList