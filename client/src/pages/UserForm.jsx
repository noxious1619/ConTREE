import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus } from "lucide-react"; 
import { Minus } from "lucide-react";
import { Edit2 } from "lucide-react";



function UserForm() {
//   const dispatch = useDispatch();
//   const showCreatePool = useSelector((state) => state.home.showCreatePool);

  // You can add other logic, handlers, or state here

return (
    <div
        className="h-screen w-screen bg-center flex items-center justify-center bg-cover"
        style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >

        {/* outer container */}
        <div className="flex flex-col w-[480px] h-[90%] max-w-full max-h-full bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg text-center">

            {/* logo on top */}
            <div className="flex flex-col items-center justify-center mb-5">
                <div className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
                style={{ backgroundImage: "url('/logo_3.png')" }}>
                </div>
            </div>

            {/* Heading */}
            <div className='flex justify-center items-center w-full mx-auto gap-2 mb-4'>
                <div className=' flex justify-center items-center text-2xl'>User 1</div>
                <button>
                    <Edit2 size={20} className="text-black-700" />
                </button>
            </div>

            {/*All content */}
            <div className=" flex flex-col items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl" >
                {/* UserForm */}
                <div className='flex flex-col items-center border- w-full h-[85%] gap-2'>

                    {/* Amount */}
                    <div className='w-[90%] h-[60px] border- text-3xl flex items-end'>Amount</div>
                    <div className='w-[90%] h-[60px] border- rounded-md bg-blue-400 text- text-3xl flex items-center'>
                        <div className='w-[10%]'>
                            ₹
                        </div>
                        <input
                            type="number"
                            min="0"
                            placeholder="Enter the amount"
                            className="w-[85%] h-[78%] rounded-r-md placeholder-gray-400 bg-white h- focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* UPI_ID */}
                    <div className='w-[90%] h-[60px] text-3xl flex items-end'>UPI ID</div>
                    <div className='w-[90%] h-[60px] border- rounded-md bg-blue-400 text-3xl flex justify-center items-center'>
                        <input
                            type="string"
                            maxlength="50"
                            placeholder="Enter the UPI ID"
                            className="w-[96%] h-[78%] rounded-md placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Note */}
                    <div className='w-[90%] h-[60px] border- text-3xl flex items-end'>Note</div>
                        <textarea
                            type="text"
                            placeholder="Scooty rent"
                            maxLength="200"
                            className="w-[90%] h-[140px] bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 placeholder-gray-400 text-2xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                </div>

                {/* buttons */}
                <div className='w-full h-[20%] border- flex justify-center'>
                    <button className='w-[80%] h-[60px] bg-blue-500 rounded-4xl text-2xl flex justify-center items-center mt-5'>Submit</button>
                </div>

            </div>

        </div>

    </div>
);

}

export default UserForm;
