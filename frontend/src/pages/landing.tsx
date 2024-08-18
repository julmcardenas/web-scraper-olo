import { useState } from 'react';
import Navbar from "../components/NavBar";
import "../app.css";
import mockupImage from '../assets/Mockup.png';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Trending() {
  const [searchType, setSearchType] = useState('Search');
  const [placeholder, setPlaceholder] = useState("'Ex. 2020 Macbook Air'");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setPlaceholder(type === 'Search' ? "'Ex. 2020 Macbook Air'" : 'Enter URL');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="landing-container bg-background-1">
        <div className="nav-placeholder h-[80px] bg-background-5 w-full"></div>
        <div className="landing-content">
          <div className="search-section">
            <div className="search-bar-container mt-20 mr-0">
              <div className="relative">
                <button 
                  className="search-bar-button text-text-1 flex items-center justify-between w-full"
                  onClick={toggleDropdown}
                >
                  {searchType}
                  <ChevronDownIcon className="h-10 w-10 ml-2 text-text-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSearchTypeChange('Search')}
                    >
                      Search
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSearchTypeChange('URL')}
                    >
                      URL
                    </button>
                  </div>
                )}
              </div>
              <div className="search-bar-field relative">
                <input
                  type="text"
                  placeholder={placeholder}
                  className="search-input pr-10"
                />
                <MagnifyingGlassIcon className="h-10 w-10 absolute right-3 top-1/2 transform -translate-y-1/2 text-text-1" />
              </div>
            </div>
            <div className="w-full">
              <p className="search-caption mt-4 text-text-2 text-md">
                Everything you need to know about your product in seconds.
              </p>
            </div>
          </div>
          <div className="hero-section mt-10">
            <h1 className="text-text-1 font-extrabold text-4xl">
              Real People. Real Reviews.
            </h1>
          </div>
         
          <div className="mockup-section w-full h-full mt-4">
            <img className="mockup" src={mockupImage} alt="Mockup" />
          </div>
        </div>
      </div>
    </>
  );
}