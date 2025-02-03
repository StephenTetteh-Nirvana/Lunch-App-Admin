import { ArrowLeft } from "lucide-react";

const PersonnelOrders = ({ personnelData,setViewOrders }) => {
  const orders = personnelData.orders;

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>; // Handle empty array case
  }

  return (
    <div className="inset-0 fixed bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-md p-5">
        <div className="flex flex-row gap-3">
          <ArrowLeft onClick={()=>setViewOrders(false)} cursor='pointer'/>
          <h3>{`${personnelData.firstName}'s Order for the week`}</h3>
        </div>
        
        {orders.map((order) => {
          // Each `order` is an object like { Wednesday: { product: 'Product1', price: 10 } }
          return Object.entries(order).map(([day, product]) => (
            <div key={day} className="grid grid-cols-3 w-full gap-5 p-3 mt-2">
              <h3 className="font-semibold">{day}</h3>
              <p>{product?.product}</p>
              <p>{product?.price}</p>
            </div>
          ));
        })}
  
        <h3 className="flex justify-end text-lg font-semibold">
          Total: {orders.map((order) => {
            return Object.entries(order).reduce((total, [day, product]) => total + product.price,0)
          })}
        </h3>
      </div>
    </div>
  );
};

export default PersonnelOrders;
