import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus } from "lucide-react"; 
import { Minus } from "lucide-react";
import { Edit2 } from "lucide-react";



function LockedPool() {
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
                <div className=' flex justify-center items-center text-2xl'>
                    Trip Manali
                </div>
            </div>

            {/*All content */}
            <div className=" flex flex-col items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl border-2" >

                {/* content-view */}
                


                    {/* Number-box */}
                    <div className='flex flex-col justify-center items-center w-full h-[40%] border-2 gap-1'>

                        {/* row-1 */}
                        <div className='border-2 w-[90%] h-[45%] flex'>

                            {/* Total */}
                            <div className='w-[50%] h-full flex flex-col justify-center items-center border-2'>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-2xl font-bold' >Total</div>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-xl font-bold'>₹254</div>
                            </div>

                            {/* Paid */}
                            <div className='w-[50%] h-full flex flex-col justify-center items-center border-2'>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-2xl font-bold' >Paid</div>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-xl font-bold'>₹9.5</div>
                            </div>

                        </div>

                        {/* row-2 */}
                        <div className='border-2 w-[90%] h-[45%] flex'>
                            {/* Share */}
                            <div className='w-[50%] h-full flex flex-col justify-center items-center border-2'>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-2xl font-bold' >Share</div>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-xl font-bold'>₹64.5</div>
                            </div>

                            {/* Pool */}
                            <div className='w-[50%] h-full flex flex-col justify-center items-center border-2'>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-2xl font-bold' >Pool</div>
                                <div className='w-[50%] h-full border-2 flex justify-center items-center text-xl font-bold'>₹40</div>
                            </div>
                        </div>
                        
                    </div>

                    {/* Contribution display */}
                    <div className='flex flex-col h-[65%] w-full border-2 bg-blue-400'>

                        {/* first-person */}
                        <div className='flex gap-3 justify-center items-center w-full h-[60px] mt-2'>
                            <div className='w-[33%] h-full flex justify-center items-center text-xl'>
                                Suresh
                            </div>
                            <div className='  w-[33%] h-full flex justify-center items-center text-xl text-orange-300'>
                                ₹9.5
                            </div>
                            <div className=' w-[33%] h-full flex justify-center items-center text-l'>
                                16/2/2025
                            </div>
                        </div>

                        {/* Second-person */}
                        <div className='flex gap-3 justify-center items-center w-full h-[60px] mt-2'>
                            <div className='w-[33%] h-full flex justify-center items-center text-xl'>
                                Ramesh
                            </div>
                            <div className='  w-[33%] h-full flex justify-center items-center text-xl text-red-500'>
                                ₹30.5
                            </div>
                            <div className=' w-[33%] h-full flex justify-center items-center text-l'>
                                <button className='h-[30px] w-[60px] bg-green-500 rounded-3xl'>
                                    Pay
                                </button>
                            </div>
                        </div>

                        {/* Third-person */}
                        <div className='flex gap-3 justify-center items-center w-full h-[60px] mt-2'>
                            <div className='w-[33%] h-full flex justify-center items-center text-xl'>
                                Raina
                            </div>
                            <div className='  w-[33%] h-full flex justify-center items-center text-xl text-green-300'>
                                ₹4.5
                            </div>
                            <div className=' w-[33%] h-full flex justify-center items-center text-l'>
                                Not paid
                            </div>
                        </div>

                        {/* fourth-person */}
                        <div className='flex gap-3 justify-center items-center w-full h-[60px] mt-2'>
                            <div className='w-[33%] h-full flex justify-center items-center text-xl'>
                                Suresh
                            </div>
                            <div className='  w-[33%] h-full flex justify-center items-center text-xl text-green-300'>
                                ₹35.5
                            </div>
                            <div className=' w-[33%] h-full flex justify-center items-center text-l'>
                                Not paid
                            </div>
                        </div>

                    </div>

            
            </div>



        </div>

    </div>
);

}

export default LockedPool;
