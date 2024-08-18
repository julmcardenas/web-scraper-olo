import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <nav className="bg-background-1 p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-white text-xl font-bold">
          <Link to="/" className="text-white px-3 py-2 rounded hover:text-white">
            ReviewPal
          </Link>
        </div>

        {showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}

        <div className="flex space-x-4 items-center justify-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            onClick={() => {
              setShowSidebar(prev => !prev);
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
