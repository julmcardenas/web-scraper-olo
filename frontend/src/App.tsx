import { KeyboardEvent, useState } from 'react';
import Navbar from "./components/NavBar";
import "./App.css";
import mockupImage from './assets/Mockup.png';
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
    <Navbar isLoggedIn={false}/>
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
// import { lazy, useEffect, useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// import "./App.css";
// import axios from "axios";
// import DataTable from "./components/Table";
// import { useUser } from "@clerk/clerk-react";
// import Navbar from "./components/NavBar";
// import Result from "./components/Result";
// import { useNavigate } from "react-router-dom";
// const mock_data = {
//   data: {
//     url: "https://headstarter.co/",
//     date: "2021-09-01",
//     description:
//       "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
//     headings: ["Heading 1", "Heading 2", "Heading 3"],
//     links: ["https://www.example.com", "https://www.example.com"],
//   },
// };

// export default function App() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [url, setUrl] = useState("");
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState(null);
//   const navigation = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalData, setModalData] = useState({ url: null, description: null, headings: [], links: [] });

//   const handleOpen = () => {
//     setOpenModal(true);
//   };

//   const handleClose = () => {
//     setOpenModal(false);
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     if (search === "") {
//       setLoading(false);

//       return;
//     }
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape/name`, { product: search });
//       const data = response.data;
//       console.log("data", data);
//       setData(data);
//       setLoading(false);
//       navigation("/results", {
//         state: { ...data },
//       });

//       // save search data to the database
//       if (isSignedIn && user) {
//         data.product = search;
//         data.userId = user.id;
//         data.date = new Date().toISOString();
//         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, { data, userId: user.id });
//       }
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar isLoggedIn={false} />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-background">
//         <div className="max-w-2xl w-full px-4 md:px-6">
//           <h1 className="text-3xl font-bold mb-4">Web Scraper</h1>
//           <p className="text-muted-foreground mb-8">Enter a URL to scrape and view the page information.</p>
//           <form onSubmit={handleSubmit} className="mb-8">
//             <div className="flex items-center border rounded-md bg-background">
//               <input
//                 type="text"
//                 placeholder="Enter a product name"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="flex-1 p-3 border-none focus:ring-0"
//               />
//               <button type="submit" className="px-4 py-3 rounded-r-md">
//                 Scrape
//               </button>
//             </div>
//           </form>
//           {loading && (
//             <div className="flex items-center justify-center mb-8">
//               <div className="w-6 h-6 text-primary" />
//               <span className="ml-2 text-muted-foreground">Loading...</span>
//             </div>
//           )}
//           {error && <div className="bg-red-500 text-red-50 p-4 rounded-md mb-8">{error}</div>}
//         </div>

//         {/* {data && <Result {...data} />} */}
//         {/* {openModal && modalData && (
//           // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           //   <div className="bg-white p-6 rounded-md shadow-md text-gray-600">
//           //     <h2 className="text-2xl font-bold mb-4">Modal</h2>
//           //     <p className="text-muted-foreground mb-4">{modalData.description}</p>
//           //     <button onClick={handleClose} className="px-4 py-2 bg-primary text-gray-600 rounded-md">
//           //       Close
//           //     </button>
//           //   </div>
//           // </div>
//           <>
//             <p>
//               <a>{modalData.url}</a>
//             </p>
//             <p>{modalData.description}</p>
//           </>
//         )} */}
//         {openModal && modalData && (
//           <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">{modalData.url}</h2>
//             <p className="text-muted-foreground mb-4">{modalData.description}</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Headings</h3>
//                 <ul className="list-disc pl-4 space-y-2">
//                   {modalData.headings.map((heading, i) => (
//                     <li key={i}>{heading}</li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Links</h3>
//                 <ul className="list-disc pl-4 space-y-2">
//                   {modalData.links.map((link, i) => (
//                     <li key={i}>
//                       <a href="#" className="text-primary hover:underline">
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
