import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { Card } from "../components/ui/Card";
export default function Recent() {
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    const fetchRecent = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recent/search`);

      setRecentSearches(res.data);
    };
    fetchRecent();
  }, []);
  return (
    <div>
      <Navbar isLoggedIn={false}/>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Recent Searches</h1>
      </div>

      <div className="p-4">
        {recentSearches.length > 0 ? (
          recentSearches.map(search => <RecentSearchesCard key={search._id} {...search} />)
        ) : (
          <div className="text-center">
            <p>No recent searches found</p>
          </div>
        )}
      </div>
    </div>
  );
}

const RecentSearchesCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white my-5">
      <div className="px-6 py-4">
        <ul className="list-none list-inside text-black">
          <li>Product: {product}</li>
        </ul>
      </div>
    </div>
  );
};
