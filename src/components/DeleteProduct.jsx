import { motion, AnimatePresence } from 'framer-motion'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

const Modal = ({ openModal, setOpenModal }) => {

    const [isClosing,setIsClosing] = useState(false)

    const closeModal = () => {
        setIsClosing(true)
        setTimeout(() => {
          setIsClosing(false)
          setOpenModal(false)
        }, 200)
      };


  return (
    <AnimatePresence>
      {openModal && !isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 0.9, opacity: 1 }} 
            exit={{ scale: 1, opacity: 0 }} 
            transition={{ duration: 0.2 }} 
            className="bg-white p-4 max-w-[250px] rounded-md"
          >
            <div className="flex flex-col justify-center items-center">
              <Trash2Icon color="red" size={50} />
              <h1 className="font-bold mt-1 text-xl">Confirm Delete</h1>
            </div>

            <h2 className="text-center text-gray-600 mt-2">
              Are you sure you want to delete this product?
            </h2>
            <div className="mt-2 flex justify-center">
              <button className="bg-red-600 p-2 px-5 rounded-md text-white">
                Delete
              </button>
              <button
                className="bg-gray-500 p-2 px-5 rounded-md text-white ml-2"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
