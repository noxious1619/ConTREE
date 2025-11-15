import React from 'react';
import NewPoolContent from '../components/NewPoolContent/NewPoolContent.jsx';
import OtherPoolsContent from '../components/OtherPoolContent/OtherPoolContent.jsx';

function Home() {

  const [activeTab, setActiveTab] = React.useState("new");

  return (
    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      <div className="flex flex-col w-[480px] h-[90%] max-w-full bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg text-center">

        {/* logo */}
        <div className="flex flex-col items-center mb-5">
          <div
            className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
        </div>

        {/* tabs */}
        <div className="flex w-full mx-auto gap-2 mb-4">
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-3 rounded-xl text-xl 
            ${activeTab === "new" ? "bg-blue-500 text-black" : "bg-gray-400 text-white"}`}
          >
            New pool
          </button>

          <button
            onClick={() => setActiveTab("other")}
            className={`flex-1 py-3 rounded-xl text-xl 
            ${activeTab === "other" ? "bg-blue-500 text-black" : "bg-gray-400 text-white"}`}
          >
            Other pools
          </button>
        </div>

        {/* content container */}
        <div className="flex justify-center max-w-md w-full h-[90%] bg-[#E9E9E9] rounded-xl overflow-hidden">
            {activeTab === "new" ? <NewPoolContent /> : <OtherPoolsContent />}
        </div>


      </div>
    </div>
  );
}

export default Home;
