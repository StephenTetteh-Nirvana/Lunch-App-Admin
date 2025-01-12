import React from 'react'
import Sidebar from '../components/Sidebar'

const Departments = () => {
  return (
    <div className='flex flex-row relative'>
      <Sidebar/>
      <div className='flex-1 ml-5 w-[97%] mt-4'>
        <h2>Departments</h2>
      </div>
    </div>
  )
}

export default Departments