import { Routes,Route,useLocation,useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import AddFoods from "./pages/AddFoods"
import ListOfFoods from "./pages/ListOfFoods"
import EditProduct from "./pages/EditProduct"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ForgotPassword from "./pages/ForgotPassword"

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

      <Routes>
        <Route path="/"  element={<AddFoods/>}></Route>
        <Route path="/foodList" element={<ListOfFoods/>}>
          <Route path=":id" element={<EditProduct/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
