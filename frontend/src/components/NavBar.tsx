import React from 'react';

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <nav className="bg-indigo-500 p-4 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Name */}
                <div className="text-white text-xl font-bold">
                    <a href="/" className="text-white px-3 py-2 rounded hover:text-white">
                        ReviewPal
                    </a>

                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4">
                    <a href="/search" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Search for Products and Reviews
                    </a>
                    <a href="/trending" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Trending Products
                    </a>
                    <a href="/history" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                        Search History
                    </a>
                </div>

                {/* Right Section: Login/Signup or Profile */}
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <a href="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                            Profile
                        </a>
                    ) : (
                        <>
                            <a href="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                                Login
                            </a>
                            <a href="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded">
                                Signup
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
