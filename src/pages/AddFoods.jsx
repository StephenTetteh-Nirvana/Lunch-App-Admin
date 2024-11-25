import ProductAddition from '../components/ProductAddition'
import Sidebar from '../components/Sidebar'

const AddFoods = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <div className='flex-1 ml-5 w-[97%] mt-4'>
        <ProductAddition/>
      </div>
    </div>
  )
}

export default AddFoods