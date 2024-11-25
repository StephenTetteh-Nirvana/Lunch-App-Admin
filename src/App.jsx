import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import AddFoods from "./pages/AddFoods"
import ListOfFoods from "./pages/ListOfFoods"
import EditProduct from "./pages/EditProduct"

const App = () => {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/"  element={<AddFoods/>}></Route>
        <Route path="/foodList" element={<ListOfFoods/>}>
          <Route path=":id" element={<EditProduct/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
