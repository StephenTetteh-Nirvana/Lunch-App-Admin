import { LogOut, UserCircle2, X, Menu } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import Swal from "sweetalert2"
import Logo from "../assets/images/freeZones.jpg"
import Account from "./Account"
import GlobalState from "../context/GlobalState"

const Navbar = () => {
  const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
  const userData = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : []


  const {setAuthenticated} = useContext(GlobalState)

  const navigate = useNavigate()
  const [openModal,setOpenModal] = useState(false)
  const [expand,setExpand] = useState(false)

  const logOut = async() =>{
    await signOut(auth)
    .then(()=>{
      navigate("/login")
      setAuthenticated(false)
      localStorage.clear()
    }).catch((error)=>{
      console.log(error)
      Swal.fire({
        title: "Network Error",
        text: "Please check your internet connection",
        icon: "error"
      })
    })
  }

  return (
  <>
    <div className="mt-5 flex flex-row justify-between w-full px-5 border-b border-slate-500 pb-3
      mobile:px-1 mobile:flex mobile:flex-col mobile:justify-between"
    >
      <div className="flex flex-row justify-between w-full">
        <div>
          <img className="w-[200px]" src={Logo} alt="Logo here" />
        </div>
        <div className="hidden mobile:block mr-3" onClick={()=>setExpand(!expand)}>
          {expand ? <X size={30} /> : <Menu size={30}/>}
        </div>
      </div>

      {user ? (
        <div className="group hover:cursor-pointer mobile:hidden">
          <div className="bg-[#2666CF] rounded-full text-white w-[50px] h-[50px] flex justify-center items-center">
            <h3 className="font-semibold text-xl">{userData.firstName[0]}</h3>
          </div>
          <div className="invisible shadow-black shadow-md p-2 rounded-md 
            z-10 bg-white absolute right-10 top-10 group-hover:visible"
          >
            <li className="flex flex-row list-none p-2 hover:bg-slate-100" onClick={()=>setOpenModal(true)}>
              <UserCircle2/>
              <span className="ml-2">Account</span>
            </li>
            <li className="flex flex-row list-none p-2 hover:bg-slate-100" onClick={()=>logOut()}>
              <LogOut/>
              <span className="ml-2">LogOut</span>
            </li>
          </div>
        </div>
      )
      :
      (
        <button className="bg-black text-white py-2 rounded-md text-md px-3 min-w-[150px] font-semibold mobile:hidden"
          onClick={()=>navigate('/login')}
        >
          Get Started
        </button>
      )
      }
      {openModal && <Account openModal={openModal} setOpenModal={setOpenModal}/>}
      
      {/* MOBILE VIEW */}

      <div className={`hidden mobile:block bg-black ${expand ? 'h-[270px]' : 'h-0'} transition-height duration-300 overflow-hidden`}>
        <ul className="mt-5">
          <li className="text-center text-white p-2 text-lg"
            onClick={()=>navigate('/')}
            style={ location.pathname === '/' ? {color:'#2666CF'} : {} }
          >
            Add Foods
          </li>
          <li className="text-center text-white p-2 text-lg cursor-pointer"
            onClick={()=>navigate('/foodList')}
            style={ location.pathname === '/foodList' ? {color:'#2666CF'} : {} }
          >
            List Of Foods
          </li>
          <li className="text-center text-white p-2 text-lg cursor-pointer"
            onClick={()=>navigate('/orders')}
            style={ location.pathname === '/orders' ? {color:'#2666CF'} : {} }
          >
            Orders
          </li>
          <li className="text-center text-white p-2 text-lg cursor-pointer"
            onClick={()=>navigate('/departments')}
            style={ location.pathname === '/departments' ? {color:'#2666CF'} : {} }
          >
            Departments
          </li>
          <div className="mt-2 flex flex-row justify-center gap-5">
            <button className="bg-[#2666CF] text-white rounded-md py-2 px-3" onClick={()=>setOpenModal(true)}>Account</button>
            <button className="bg-red-600 text-white rounded-md py-2 px-3" onClick={()=>logOut()}>LogOut</button>
          </div>
        </ul>
      </div>

    </div>
  </>

  )
}

export default Navbar