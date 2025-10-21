import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus } from "lucide-react"; 
import { Minus } from "lucide-react";
import { Edit2 } from "lucide-react";



function NewPool() {
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
            <div className="flex flex-col items-center justify-center mb-5">
                <div className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
                style={{ backgroundImage: "url('/logo_3.png')" }}>
                </div>
            </div>

            {/* Heading */}
            <div className='flex justify-center items-center w-full mx-auto gap-2 mb-4'>
                <div className=' flex justify-center items-center text-2xl'>New Pool 1</div>
                <button>
                    <Edit2 size={20} className="text-black-700" />
                </button>
            </div>

            {/*All content */}
            <div className=" flex flex-col justify-center items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl" >

                {/* main content */}
                <div className=" flex flex-col items-center max-w-md w-full h-[85%] mb-5 bg-[#E9E9E9] rounded-xl border- mt-4">
                    
                    <div className='flex gap-3 justify-center items-center w-[94%] h-[55px] bg-gray-300 rounded-xl border-2'>
                        <div className='w-8 h-8 border-2 flex justify-center items-center rounded-full text-xl'>1</div>
                        <div className='w-[50%] border-2 text-left flex items-center text-xl'>User 1</div>
                        <div className='w-[15%] border-2 text-left text-xl'>₹0</div>
                        <div className='w-[10%] border-2 mr-0.5 flex justify-center items-center text-xl'>logo</div>
                    </div>
                    <div>user 2</div>
                </div>
                
                <div className='flex'>
                    <button className='w-[50%] h-[60px] bg-blue-500 mt-1 rounded-4xl text-2xl'>
                        Lock
                    </button>
                    <button className='flex h-10 w-10 rounded-4xl border-2'>
                        <Plus size={30} className="text-black-700 mt-4" />
                    </button>
                </div>

            </div>

        </div>

        

        

    </div>
);

}

export default NewPool;
