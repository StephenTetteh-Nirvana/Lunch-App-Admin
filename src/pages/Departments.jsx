import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import GlobalState from '../context/GlobalState'
import OrderList from '../components/OrderList'
import PersonnelsList from '../components/PersonnelsList'

const Departments = () => {  
  const {fetchDepartments,departments,fetchingDepartments} = useContext(GlobalState)
  const [showOrders,setShowOrders] = useState(false)
  const [showPersonnels,setShowPersonnels] = useState(false)
  const [departmentID,setDepartmentID] = useState('')

  useEffect(()=>{
    fetchDepartments()
  },[])

  const displayOrders = (id) => {
    setShowOrders(true)
    setDepartmentID(id)
  }

  const displayPersonnels = (id) => {
    setShowPersonnels(true)
    setDepartmentID(id)
  }

  return (
    <div className='flex flex-row relative'>
      <Sidebar/>
     <div className='flex-1 ml-5 w-[97%] mt-4'>
      <div className='border border-slate-500 rounded-md w-[97%] p-2'>
        { fetchingDepartments ? 
          <button className="flex items-center justify-center mt-5 w-full mb-5">
            <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div> 
          </button>
          :
          departments.length > 0 ? departments.map((item)=>(
            <div key={item.id} className='p-4 flex justify-between'>
               <div>
                <p className='font-bold text-lg'>{item.id}</p>
                <p className='text-sm text-slate-700'>{item.HR}</p>
               </div>
               <div>
                <button className='bg-white border border-slate-300 shadow-sm cursor-pointer 
                  p-2 text-sm text-black rounded-md hover:bg-slate-100 mr-3'
                  onClick={()=>displayOrders(item.id)}
                >
                  View Orders
                </button>
                <button className='bg-white border border-slate-300 shadow-sm cursor-pointer 
                  p-2 text-sm text-black rounded-md hover:bg-slate-100'
                  onClick={()=>displayPersonnels(item.id)}
                >
                  View Personnels
                </button>
              </div>
           </div>
          ))
          : 
          <div>
            <h2>No departments yet</h2>
          </div>
        }
      </div> 
      {showOrders && <OrderList setShowOrders={setShowOrders} showOrders={showOrders} departmentID={departmentID}/>}
      {showPersonnels && <PersonnelsList setShowPersonnels={setShowPersonnels} showPersonnels={showPersonnels} departmentID={departmentID}/>}
    </div>
  </div>
  )
}

export default Departments