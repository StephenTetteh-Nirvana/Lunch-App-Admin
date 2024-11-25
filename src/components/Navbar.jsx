import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../assets/images/freeZones.jpg"


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [expand,setExpand] = useState(false)

  return (
    <>
      <div className="border border-b-slate-500 pb-4 px-2 flex flex-row justify-between">
        <div className="mt-5">
          <img className="w-[200px]" src={Logo} alt="Logo here" />
        </div>
        <div className="mt-5 hidden mobile:block mr-3" onClick={()=>setExpand(!expand)}>
          {expand ? <X size={30} /> : <Menu size={30}/>}
        </div>
      </div>
  
      <div className={`bg-black ${expand ? 'h-[185px]' : 'h-0'} transition-height duration-300 overflow-hidden`}>
        <ul>
          <li className="text-center text-white p-2 text-lg"
            onClick={()=>navigate('/')}
            style={ location.pathname === '/' ? {color:'#2666CF'} : {} }
          >
            Add Foods
          </li>
          <li className="text-center text-white p-2 text-lg"
            onClick={()=>navigate('/foodList')}
            style={ location.pathname === '/foodList' ? {color:'#2666CF'} : {} }
          >
            List Of Foods
          </li>
          <li className="text-center text-white p-2 text-lg"
          >
            Orders
          </li>
          <li className="text-center text-white p-2 text-lg">Logout</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar