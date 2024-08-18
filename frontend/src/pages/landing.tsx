import { KeyboardEvent, useState } from 'react';
import Navbar from "../components/NavBar";
// import "../App.css";
import mockupImage from '../assets/Mockup.png';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const [searchType, setSearchType] = useState('name');
  const [placeholder, setPlaceholder] = useState("'Ex. 2020 Macbook Air'");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();


  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
    setPlaceholder(type === 'name' ? "'Ex. 2020 Macbook Air'" : 'Enter URL');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const submitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const searchValue = (event.target as HTMLInputElement).value;
      handleSubmit(event);
      // if (searchType === 'name') {
      //   window.location.href = `/search?q=${searchValue}`;
      // } else {
      //   window.location.href = `/product?url=${searchValue}`;
      // }
    }
  }

  const handleSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);

    if (search === "") {
      setLoading(false);
      return;
    }

    try {
      // scrap url or product name
      const body = searchType === 'name' ? { product: search } : { url: search };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape/${searchType}`, body);
      const data = response.data;
      console.log("data", data);
      setData(data);
      setLoading(false);

      // redirect to results page
      navigation("/results", {
        state: { ...data },
      });

      // save product review data to the database
      if (isSignedIn && user) {
        data.product = search;
        data.userId = user.id;
        data.date = new Date().toISOString();
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, { data, userId: user.id });
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
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
                  {searchType === 'name' ? 'Product' : 'URL'}
                  <ChevronDownIcon className="h-10 w-10 ml-2 text-text-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100"
                      onClick={() => handleSearchTypeChange('name')}
                    >
                      Product Name
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100"
                      onClick={() => handleSearchTypeChange('url')}
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
                  className="search-input pr-10 bg-white text-gray-500"
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={(e) => submitSearch(e)}
                />
                {loading ? (
                  <svg className="animate-spin h-10 w-10 absolute right-3 text-gray-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.5"
                    />
                  </svg>
                ) : (
                  <MagnifyingGlassIcon className="h-10 w-10 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                )}
              </div>
            </div>
            <div className="w-full">
              <p className="search-caption mt-4 text-text-2 text-md">
                Everything you need to know about that product you've been eyeing.
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