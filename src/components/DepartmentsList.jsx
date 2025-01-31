import React from 'react'

const DepartmentsList = () => {
  const list = [
    {
        name:'Finance',
        admin: 'Richard Kugbazor'
    },
    {
        name:'Sales',
        admin:'Stephen Tetteh'
    },
    {
        name:'Marketing',
        admin:'Kelvin Obiri'
    }
  ]
  return (
    <div className='border border-slate-500 rounded-md w-[97%] p-2'>
      {list.map((item)=>(
        <div className='p-4 flex justify-between'>
          <div>
            <p className='font-bold text-lg'>{item.name}</p>
            <p className='text-sm text-slate-700'>{item.admin}</p>
          </div>
          <div>
            <button className='bg-white border border-slate-300 shadow-sm cursor-pointer p-2 text-sm text-black rounded-md'>View More</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DepartmentsList