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
        className="fixed top-0 right-0 h-full w-1/3 bg-white flex flex-col items-center  transform translate-x-full animate-slide-in"
        onClick={() => handleClose()}
      >
        <div className="flex flex-col space-y-4 my-10	">
          <div className="flex flex-row space-y-4 items-center text-black">
            01
            <Link to="/search" className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
              Search Reviews
            </Link>
          </div>
          <div className="flex flex-row space-y-4 items-center text-black">
            02
            <Link to="/trending" className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
              Trending Products
            </Link>
          </div>
          <div className="flex flex-row space-y-4 items-center text-black">
            03
            <Link to="/history" className="text-black hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
              Search History
            </Link>
          </div>
        </div>
        <div className="flex-1" onClick={handleClose}></div>
      </div>
    )
  );
}
