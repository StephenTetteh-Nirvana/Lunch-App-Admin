import React from 'react'
import Sidebar from '../components/Sidebar'
import ProductList from '../components/ProductList'

const ListOfFoods = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <div className='flex-1 ml-5 w-[97%] mt-4'>
        <ProductList/>
      </div>
    </div>
  )
}

export default ListOfFoods