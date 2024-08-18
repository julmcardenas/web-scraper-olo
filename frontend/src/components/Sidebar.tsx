import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar({ showSidebar, setShowSidebar }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setShowSidebar(false);
    setTimeout(() => {
      // Remove the sidebar after the animation completes
      setIsVisible(null);
    }, 5000); // Duration matches the animation duration
  };

  return (
    isVisible && (
      <div
        className="fixed border-l-4 border-black top-0 right-0 h-full w-1/2 sm:w-1/3 p-3 bg-background-4 flex flex-col items-center  transform translate-x-full animate-slide-in"
        onClick={() => handleClose()}
      >

  <button
    onClick={handleClose}
    className="absolute top-0 left-0 text-black text-3xl font-bold focus:outline-none bg-transparent p-3 pl-6"
  >
    &times;
  </button>
        

        <div className="flex flex-col space-y-6 my-10	">
          <div className="flex flex-row space-y-8 items-center text-black">
            01
            <Link to="/" className="text-black text-2xl font-bold  hover:text-background-10 px-3 py-2 rounded flex-nowrap w-full">
              SEARCH REVIEWS
            </Link>
          </div>
          <div className="flex flex-row space-y-4 items-center text-black">
            02
            <Link to="/trending" className="text-black text-2xl font-bold hover:text-background-10 px-3 py-2 rounded">
              TRENDING 
            </Link>
          </div>
          <div className="flex flex-row space-y-4 items-center text-black">
            03
            <Link to="/history" className="text-black text-2xl font-bold  hover:text-background-10 px-3 py-2 rounded">
              SEARCH HISTORY
            </Link>
          </div>
          <div className="flex flex-row space-y-4 items-center text-black">
            04
            <Link to="/recent" className="text-black text-2xl font-bold  hover:text-background-10 px-3 py-2 rounded">
              RECENT SEARCH
            </Link>
          </div>
        </div>
        <div className="flex-1" onClick={handleClose}></div>
      </div>
    )
  );
}
