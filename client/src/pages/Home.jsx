import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus } from "lucide-react"; // Import the icon
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  // You can add other logic, handlers, or state here

return (
    <div
        className="h-screen w-screen bg-center flex items-center justify-center bg-cover"
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

            {/* buttons */}
            <div className="flex w-full mx-auto gap-2 mb-4">
                <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl text-xl">New pool</button>
                <button className="flex-1 bg-gray-500 text-white py-4 rounded-xl text-xl" >Other pools</button>
            </div>

            {/* content */}
            <div className=" flex justify-center items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl">
                <div className="flex flex-col justify-center items-center">
                    <button 
                    onClick={() => navigate('/counter')} 
                    className=' rounded-full bg-[#C4E4FF] p-2 mb-4'>
                        <Plus className="w-25 h-25 text-blue-500" />
                    </button>
                    <div className='max-w-md text-2xl font-semibold'>Create a new pool</div>
                </div>
            </div>

        </div>

        

        

    </div>
);

}

export default Home;
