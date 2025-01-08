import { useContext, useState } from 'react'
import { X } from 'lucide-react'
import GlobalState from '../context/GlobalState'

const DaySelection = () => {
  const {setFinalProcess,addFood,day,setDay} = useContext(GlobalState)

  const [loading,setLoading] = useState(false)
  
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

  return (
    <div className='bg-black/40 flex justify-center items-center absolute top-0 left-0 w-full h-full'>
      <div className='bg-white rounded-md w-[250px] flex flex-col p-5'>
        <div onClick={()=>setFinalProcess(false)}>
          <X color="black" size={23} className='ml-[90%] cursor-pointer'/>
        </div>
        
        <div>
          <h2 className='font-bold text-black'>Note:</h2>
          <p>Each day can only contain three foods.</p>
        </div>

        <select 
          className="border border-slate-500 outline-none mt-2"
          value={day} 
          onChange={(e)=>setDay(e.target.value)} 
        >
          {days.map((item,index)=>(
            <option key={index}>{item}</option>
          ))}
        </select>

        { !loading ? 
        <button className='mt-3 bg-[#2666CF] text-white py-2 px-3 rounded-md' 
          onClick={()=>addFood(setLoading)}
        >
          Complete Process
        </button>
        : 
        <button
          className="flex items-center justify-center gap-2 mt-3 bg-[#2666CF] text-white py-2 w-full rounded-md
          font-semibold opacity-70 cursor-not-allowed"
        >
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Please Wait 
        </button>
        }
      </div>
    </div>
  )
}

export default DaySelection