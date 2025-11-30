import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Minus, ArrowLeft } from "lucide-react"; 
import { increment, decrement } from '../features/counter/counterSlice';
import toast from 'react-hot-toast';
import axios from "axios";

function Counter() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);
    const navigate = useNavigate(); 

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
            className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
            style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

            {/* Main Glass Card */}
            <div className="relative z-10 flex flex-col w-[480px] h-[90%] max-h-[850px] max-w-[95%] 
                bg-white/70 backdrop-blur-xl border border-white/40 
                p-8 rounded-[40px] shadow-2xl text-center overflow-hidden transition-all duration-500">
                
                {/* Back Button (UX improvement) */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 p-2 rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-center bg-contain shadow-lg bg-white border-4 border-white/50"
                        style={{ backgroundImage: "url('/logo_3.png')" }}>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col justify-between items-center w-full py-4">

                    {/* Heading */}
                    <div className='text-3xl font-bold text-gray-800 tracking-tight'>
                        Participants
                        <span className="block text-sm font-medium text-gray-500 mt-1 uppercase tracking-widest">
                            Set pool size
                        </span>
                    </div>

                    {/* Counter Controls */}
                    <div className="flex flex-col items-center justify-center gap-6 my-4 w-full">
                        
                        {/* Increment Button */}
                        <button 
                            onClick={() => dispatch(increment())}
                            className="group flex items-center justify-center w-20 h-20 
                            bg-blue-100/80 hover:bg-blue-500 active:bg-blue-600 
                            border-2 border-blue-200/50 hover:border-blue-500
                            rounded-2xl shadow-lg transition-all duration-200 ease-out 
                            transform hover:scale-105 active:scale-95"
                        >
                            <Plus className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" strokeWidth={3} />
                        </button>

                        {/* The Number */}
                        <div className="relative w-full flex justify-center py-4">
                            <div className='text-9xl font-bold text-gray-800 tabular-nums leading-none drop-shadow-sm select-none'>
                                {count}
                            </div>
                        </div>

                        {/* Decrement Button */}
                        <button 
                            onClick={() => dispatch(decrement())}
                            className="group flex items-center justify-center w-20 h-20 
                            bg-red-200 hover:bg-red-500 active:bg-red-600 
                            border-2 border-red-200 hover:border-red-500
                            rounded-2xl shadow-lg transition-all duration-200 ease-out 
                            transform hover:scale-105 active:scale-95"
                        >
                            <Minus className="w-10 h-10 text-red-500 group-hover:text-white transition-colors" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={handleSubmit} 
                        disabled={count === 0}
                        className={`w-full py-4 rounded-2xl text-xl font-bold uppercase tracking-wide shadow-xl transition-all duration-300 transform
                        ${count === 0 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70" 
                            : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0"
                        }`}
                    >
                        Create Pool
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Counter;