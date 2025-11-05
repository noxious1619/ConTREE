import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import EditableUserName from '../components/UserName/EditableUserName';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


function UserForm() {
    const { poolid, userid } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let amountTimeout;

    const handleAmountChange = (e) => {
    const input = e.target;
    const value = Number(input.value);

    // clear previous timer if user keeps typing
    clearTimeout(amountTimeout);

    amountTimeout = setTimeout(() => {
        if (value <= 0) {
        toast.error("Amount cannot be zero or negative!");
        input.value = ""; 
        }
    }, 800); 
    };


    const handleSubmit = async () => {

    const amountInput = document.getElementById("amountInput");
    const upiInput = document.getElementById("upiInput");
    const noteInput = document.getElementById("noteInput");

    const amountValue = Number(amountInput.value);
    const upiValue = upiInput.value.trim();
    const noteValue = noteInput.value.trim();

    const finalAmount = amountValue > 0 || amountValue == '' ? amountValue : 1;
    const finalUpi = upiValue !== "" ? upiValue : "default@upi"; // default UPI ID
    const finalNote = noteValue !== "" ? noteValue : "No note"; // default note

    // validation
    // if (!amountValue || amountValue <= 0) {
    //     toast.error("Amount must be greater than 0!");
    //     return;
    // }

    // if (!upiValue) {
    //     toast.error("UPI ID cannot be empty!");
    //     return;
    // }

    try {
        await axios.put(`http://localhost:5000/api/pools/users/${poolid}/${userid}`, {
        amount: amountValue,
        upiId: upiValue,
        note: noteValue,
        });

        navigate(-1);
        toast.success("Details saved successfully!");
        
    } catch (error) {
        console.error("Error saving details:", error);
        toast.error("Failed to save details. Try again!");
    }
    };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pools/${poolid}`);

        const pool = res.data;

        // find the user by id
        const foundUser = pool.users.find((u) => u._id === userid);
        setUserData(foundUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [poolid, userid]);

  if (loading) return <div>Loading user data...</div>;
//   if (!userData) return <div>User not found in this pool.</div>;

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
            <EditableUserName name={userData.name} userId={userid} />
            <div className='flex justify-center items-center w-full mx-auto gap-2 mb-4'>
                
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
                            id="amountInput"
                            min="0"
                            onChange={handleAmountChange}
                            placeholder= {userData.amount}
                            className="w-[85%] h-[78%] rounded-r-md bg-white h- focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* UPI_ID */}
                    <div className='w-[90%] h-[60px] text-3xl flex items-end'>UPI ID</div>
                    <div className='w-[90%] h-[60px] border- rounded-md bg-blue-400 text-3xl flex justify-center items-center'>
                        <input
                            type="string"
                            maxLength="50"
                            id="upiInput"
                            placeholder={userData.upiId}
                            className="w-[96%] h-[78%] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Note */}
                    <div className='w-[90%] h-[60px] border- text-3xl flex items-end'>Note</div>
                        <textarea
                            id="noteInput"
                            type="text"
                            placeholder="Write Something..."
                            maxLength="200"
                            className="w-[90%] h-[140px] bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 placeholder-gray-400 text-2xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                </div>

                {/* buttons */}
                <div className='w-full h-[20%] border- flex justify-center'>
                    <button 
                        className='w-[80%] h-[60px] bg-blue-500 rounded-4xl text-2xl flex justify-center items-center mt-5'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                </div>

            </div>

        </div>

    </div>
);

}

export default UserForm;
