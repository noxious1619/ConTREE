import React from 'react';
import NewPoolContent from '../components/NewPoolContent/NewPoolContent.jsx';
import OtherPoolsContent from '../components/OtherPoolContent/OtherPoolContent.jsx';

function Home() {

  const [activeTab, setActiveTab] = React.useState("new");

  return (
    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Dark overlay to ensure text readability over the tree background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {/* Main Glass Card */}
      <div className="relative z-10 flex flex-col w-[480px] h-[90%] max-h-[850px] max-w-[95%] 
        bg-white/70 backdrop-blur-xl border border-white/40 
        p-8 rounded-[40px] shadow-2xl text-center overflow-hidden transition-all duration-500">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 transform hover:scale-105 transition-transform duration-300">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center bg-center bg-contain shadow-lg bg-white border-4 border-white/50"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
        </div>

        {/* Tabs Section */}
        <div className="flex w-full mx-auto gap-3 mb-6 p-1 bg-gray-100/50 rounded-2xl border border-white/50">
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-out
            ${activeTab === "new" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" 
              : "bg-transparent text-gray-500 hover:bg-white/60 hover:text-gray-700"}`}
          >
            New pool
          </button>

          <button
            onClick={() => setActiveTab("other")}
            className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-out
            ${activeTab === "other" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" 
              : "bg-transparent text-gray-500 hover:bg-white/60 hover:text-gray-700"}`}
          >
            Other pools
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 w-full bg-white/60 border border-white/40 rounded-3xl shadow-inner overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto p-4 custom-scrollbar">
                {activeTab === "new" ? <NewPoolContent /> : <OtherPoolsContent />}
            </div>
        </div>

      </div>
    </div>
  );
}

export default Home;