import React, { useState, useEffect } from 'react';
import EditableUserName from '../components/UserName/EditableUserName';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function UserForm() {
  const { poolid, userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let amountTimeout;

  const handleAmountChange = (e) => {
    const input = e.target;
    const value = Number(input.value);

    clearTimeout(amountTimeout);

    amountTimeout = setTimeout(() => {
      if (value <= 0) {
        toast.error("Amount cannot be zero or negative!");
        input.value = "";
      }
    }, 800);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pools/${poolid}`);
        const pool = res.data;

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
  if (!userData) return <div>User not found in this pool.</div>;

  // Define original data (after fetch)
  const originalData = {
    amount: userData.amount?.toString() || "",
    upiId: userData.upiId || "",
    note: userData.note || "",
  };

  // --- HANDLE SUBMIT ---
  const handleSubmit = async () => {
    const amountInput = document.getElementById("amountInput");
    const upiInput = document.getElementById("upiInput");
    const noteInput = document.getElementById("noteInput");

    const amountValue = amountInput.value.trim();
    const upiValue = upiInput.value.trim();
    const noteValue = noteInput.value.trim();

    const payload = {};

    // Add ONLY changed + non-empty fields
    if (amountValue !== "" && amountValue !== originalData.amount) {
      payload.amount = Number(amountValue);
    }

    if (upiValue !== "" && upiValue !== originalData.upiId) {
      payload.upiId = upiValue;
    }

    if (noteValue !== "" && noteValue !== originalData.note) {
      payload.note = noteValue;
    }

    // If nothing changed, return back
    if (Object.keys(payload).length === 0) {
      navigate(-1);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/pools/users/${poolid}/${userid}`,
        payload
      );

      toast.success("Details updated!");
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update. Try again!");
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
        <div className="flex flex-col items-center justify-center mb-5">
          <div
            className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
        </div>

        {/* Name */}
        <EditableUserName name={userData.name} userId={userid} />

        {/* content */}
        <div className="flex flex-col items-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl">

          <div className="flex flex-col items-center w-full h-[85%] gap-2">

            {/* Amount */}
            <div className="w-[90%] h-[60px] text-3xl flex items-end">Amount</div>
            <div className="w-[90%] h-[60px] rounded-md bg-blue-400 text-3xl flex items-center">
              <div className="w-[10%]">₹</div>
              <input
                type="number"
                id="amountInput"
                min="0"
                onChange={handleAmountChange}
                placeholder={userData.amount}
                className="w-[85%] h-[78%] rounded-r-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* UPI */}
            <div className="w-[90%] h-[60px] text-3xl flex items-end">UPI ID</div>
            <div className="w-[90%] h-[60px] rounded-md bg-blue-400 text-3xl flex items-center justify-center">
              <input
                type="text"
                id="upiInput"
                maxLength="50"
                placeholder={userData.upiId}
                className="w-[96%] h-[78%] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Note */}
            <div className="w-[90%] h-[60px] text-3xl flex items-end">Note</div>
            <textarea
              id="noteInput"
              maxLength="200"
              placeholder={userData.note}
              className="w-[90%] h-[140px] bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit button */}
          <div className="w-full h-[20%] flex justify-center">
            <button
              className="w-[80%] h-[60px] bg-blue-500 rounded-4xl text-2xl flex justify-center items-center mt-5"
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
