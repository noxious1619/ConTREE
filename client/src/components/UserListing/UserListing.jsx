

<div className="flex flex-col items-center w-full h-[80%] bg-[#E9E9E9] mt-2 overflow-y-auto hide-scrollbar">
            {pool.users.map((user, index) => (
              <div
                key={user._id}
                className="flex gap-3 justify-center items-center w-[93%] h-[50px] bg-gray-400 rounded-xl shadow-xl mt-2 shrink-0"
              >
                <div className="w-8 h-8 flex justify-center items-center rounded-full text-xl bg-blue-300 hover:bg-blue-500">
                  {index + 1}
                </div>
                <div className="w-[50%] text-left flex items-center text-xl">
                  {user.name}
                </div>
                <div className="w-[15%] text-left text-xl">₹{user.amount}</div>
                <button className="h-7 w-7 border-2 mr-0.5 flex justify-center items-center rounded-full">
                  <Minus className="h-7 w-7" />
                </button>
              </div>
            ))}
          </div>