import { FileX, Trash, Pencil } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onSnapshot , doc } from "firebase/firestore"
import { db } from "../firebase"
import Waakye from "../assets/images/waakye.jpg"
import DeleteProduct from "./DeleteProduct"

const ProductList = () => {
  const navigate = useNavigate()

  const [openModal,setOpenModal] = useState(false)
  const [fetching,setFetching] = useState(false)
  const [selectedDay,setSelectedDay] = useState('Monday')
  const [foods,setFoods] = useState([])

  const list = []

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

  const fetchFoods = () => {
    try{
      console.log('running')
      setFetching(true)
      const unsub = onSnapshot(doc(db,"Foods",selectedDay),(snapshot)=>{
        const allFoods = snapshot.data().foods || []
        setFoods(allFoods)
        localStorage.setItem('foods',JSON.stringify(allFoods))
        console.log(foods)
        setFetching(false)
      })
      return unsub;
    }catch(error){
      console.log(error)
      setFetching(false)
    }
  }

  useEffect(()=>{
    fetchFoods()
  },[selectedDay])

  return (
    <div>
      <div>
        <select 
          className="border border-slate-500 outline-none mt-2 flex justify-end"
          value={selectedDay}
          onChange={(e)=>(setSelectedDay(e.target.value))}
        >
          {days.map((item,index)=>(
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>

      <div className='mt-3 border border-slate-500 rounded-[8px] py-5 pl-5 w-[97%] h-[65vh] overflow-auto overflow-x-hidden'>
        { fetching ? 
          <button className="flex items-center justify-center m-auto mt-16">
            <div className="w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin"></div> 
          </button>
        :
        foods.length > 0 ? 
          <div>
            <ul className="grid grid-cols-4">
              <li className="font-bold">Image</li>
              <li className="font-bold">Product</li>
              <li className="font-bold">Price</li>
              <li className="font-bold">Actions</li>
            </ul>
  
            <div className="mt-2">
              {foods.map((item,index)=>(
                <div key={index} className="grid grid-cols-4 py-1">
                  <img src={Waakye} className="max-w-[100px] max-h-[100px] mobile:w-[50px] mobile:h-[50px]" alt="product here"/>
                  <h3>{item.product}</h3>
                  <h3>{item.price}</h3>
                  <div className="flex gap-3">
                    <Pencil color="blue" size={20} onClick={()=>navigate(`/foodList/${item.id}`)} style={{cursor:'pointer'}} />
                    <Trash color="red" size={20} style={{cursor:'pointer'}} onClick={()=>setOpenModal(true)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        : 
          <div className="flex justify-center items-center w-full h-full mobile:flex-col">
            <FileX className="w-[200px] h-[150px]" color="grey" />
            <div>
              <h1 className="font-extrabold mt-2 text-xl">Your List Is Empty</h1>
              <p className="text-gray-500">Added foods will be listed here.</p>
              <button className="bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 rounded-[4px] 
                px-4 py-2 text-white mt-2 text-sm hover:scale-105 transition-scale duration-300"
                onClick={()=>navigate('/')}
              >
                Get Started
              </button>
            </div>
          </div>
        }
        {openModal && <DeleteProduct openModal={openModal} setOpenModal={setOpenModal}/>}
        <Outlet/>   
      </div>
    </div>
  )
}

export default ProductList