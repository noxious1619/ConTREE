import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus } from "lucide-react"; 
import { Minus } from "lucide-react";



function Counter() {
//   const dispatch = useDispatch();
//   const showCreatePool = useSelector((state) => state.home.showCreatePool);

  // You can add other logic, handlers, or state here

return (
    <div
        className="h-screen w-screen bg-center flex items-center justify-center bg-stre"
        style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >

        {/* outer container */}
        <div className="flex flex-col w-[480px] h-[90%] max-w-full max-h-full bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg text-center">
            {/* logo on top */}
            <div className="flex flex-col items-center mb-5">
                <div className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
                style={{ backgroundImage: "url('/logo_3.png')" }}>
                </div>
            </div>

            {/* content */}
            <div className=" flex flex-col justify-center items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl" >

                {/* heading */}
                <div className='text-3xl font-semibold'>
                    Number of Participants
                </div>

                <div className=" flex flex-col justify-center items-center max-w-md w-full h-[75%] bg-[#E9E9E9] rounded-xl">
                    <div>
                        <Plus className="w-20 h-20 text-blue-500 bg-blue-200 mb-3" />
                    </div>
                    <div className='text-9xl'>0</div>
                    <div>
                        <Minus className="w-20 h-20 text-blue-500 bg-blue-200 mt-5" />
                    </div>
                </div>

                <button className='w-[50%] h-[60px] bg-blue-500 mt-1 rounded-4xl text-2xl'>
                    Submit
                </button>

            </div>

        </div>

        

        

    </div>
);

}

export default Counter;
