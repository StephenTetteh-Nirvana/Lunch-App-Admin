import { useLocation,useNavigate} from "react-router-dom"
import { Suspense, useEffect } from "react"
import Navbar from "./components/Navbar"
import MainRoutes from "./routes/main-routes"


const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null

  const userStatus = () => {
    if(!user && location.pathname === '/'){
      navigate('/login')
    }
  }

  useEffect(()=>{
    userStatus()
  })

  return (
    <div>
      <div className="bg-white w-full">
        {location.pathname ==='/login' || location.pathname ==='/register' || location.pathname ==='/forgotPassword' ? ''
          :
          <Navbar/>
        }
      </div>

        <Suspense fallback={<div className="flex justify-center items-center">Loading your content...</div>}>
          <MainRoutes/>
        </Suspense>

    </div>
  )
}

export default App
