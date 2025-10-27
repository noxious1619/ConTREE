import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from "lucide-react"; 
import { Minus } from "lucide-react";
import { increment, decrement } from '../features/counter/counterSlice';
import toast from 'react-hot-toast';
import axios from "axios";

function Counter() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);

    const navigate = useNavigate(); 


  // You can add other logic, handlers, or state here


const handleSubmit = async () => {
  if (count === 0) {
    toast.error("Cannot submit 0 participants!");
    return;
  }

  try {
    // Call backend API to generate users
    const res = await axios.post("http://localhost:5000/api/pools/generate", { count });


    console.log("Created users:", res.data);
    toast.success(`${res.data.users.length} users created!`);
    navigate(`/newpool/${res.data._id}`);

  } catch (err) {
    console.error(err);
    toast.error("Failed to create users!");
  }
};



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

            {/* content */}
            <div className=" flex flex-col justify-center items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl" >

                {/* heading */}
                <div className='text-3xl font-semibold'>
                    Number of Participants
                </div>

                <div className=" flex flex-col justify-center items-center max-w-md w-full h-[75%] bg-[#E9E9E9] rounded-xl">
                    <div>
                        <Plus
                            onClick={() => dispatch(increment())} 
                            className="w-20 h-20 rounded-xl text-blue-500 bg-blue-200 mb-3 cursor-pointer select-none" 
                        />
                    </div>
                    <div className='text-9xl'>{count}</div>
                    <div>
                        <Minus 
                            onClick={() => dispatch(decrement())} 
                            className="w-20 h-20 rounded-xl text-blue-500 bg-blue-200 mt-5 cursor-pointer select-none" />
                    </div>
                </div>

                <button onClick={handleSubmit} className='w-[50%] h-[60px] bg-blue-500 mt-1 rounded-4xl text-2xl font-medium'>
                    Submit
                </button>

            </div>

        </div>

    </div>
);

}

export default Counter;
