import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <nav className="bg-indigo-500 p-4 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Name */}
                <div className="text-white text-xl font-bold">
                    <Link to="/" className="text-white px-3 py-2 rounded hover:text-white">
                        ReviewPal
                    </Link>

                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4">
                    <Link to="/search" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Search Reviews
                    </Link>
                    <Link to="/trending" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Trending Products
                    </Link>
                    <Link to="/history" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Search History
                    </Link>
                </div>

                {/* Right Section: Login/Signup or Profile */}
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <Link to="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                            Profile
                        </Link>
                    ) : (
                        <>
                            <Link to="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                                Login
                            </Link>
                            <Link to="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
