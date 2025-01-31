import React from 'react'
import Sidebar from '../components/Sidebar'
import DepartmentsList from '../components/DepartmentsList'

const Departments = () => {
  return (
    <div className='flex flex-row relative'>
      <Sidebar/>
      <div className='flex-1 ml-5 w-[90%] mt-4'>
        <DepartmentsList/>
      </div>
    </div>
  )
}

export default Departments