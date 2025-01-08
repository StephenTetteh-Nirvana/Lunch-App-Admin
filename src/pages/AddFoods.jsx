import { useContext } from 'react'
import ProductAddition from '../components/ProductAddition'
import Sidebar from '../components/Sidebar'
import DaySelection from '../components/DaySelection'
import GlobalState from '../context/GlobalState'

const AddFoods = () => {
  const {finalProcess} = useContext(GlobalState)


  return (
    <div className='flex flex-row relative'>
      <Sidebar/>
      <div className='flex-1 ml-5 w-[97%] mt-4'>
        <ProductAddition/>
        {finalProcess && <DaySelection/>}
      </div>
    </div>
  )
}

export default AddFoods