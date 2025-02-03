import { CirclePlus, LayoutList, ChevronRight, ChevronLeft, House } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [expand,setExpand] = useState(false)
  
  return (
    <div className={`bg-[#333] py-4 ${expand ? 'w-[200px]' : 'w-[60px]'} min-h-screen transition-width duration-300 mobile:hidden`}>
      <div className="flex justify-center">
        <div className="rounded-full p-2 bg-white flex items-center cursor-pointer" onClick={()=>setExpand(!expand)}>
          {expand ? <ChevronLeft /> : <ChevronRight/>} 
        </div>
      </div>
      <ul className='flex flex-col gap-3 list-none mt-8'>
        <li className='flex flex-row gap-3 hover:text-[#2666CF] hover:cursor-pointer p-3 text-white'
          onClick={()=>navigate('/')}
          style={ location.pathname === '/' ? {color:'#2666CF'} : {} }
        >
          <span><CirclePlus /></span>
          {expand && 'Add Foods'}
        </li>
        <li className='flex flex-row gap-3 hover:text-[#2666CF] hover:cursor-pointer p-3 text-white'
          onClick={()=>navigate('/foodList')}
          style={ location.pathname === '/foodList' ? {color:'#2666CF'} : {} }
        >
          <span><LayoutList /></span>
          {expand && 'List Of Foods'}
        </li>
        <li className='flex flex-row gap-3 hover:text-[#2666CF] hover:cursor-pointer p-3 text-white'
          onClick={()=>navigate('/departments')}
          style={ location.pathname === '/departments' ? {color:'#2666CF'} : {} }
        >
          <span><House /></span>
          {expand && 'Departments'}
        </li>
      </ul> 
    </div>
  )
}

export default Sidebar