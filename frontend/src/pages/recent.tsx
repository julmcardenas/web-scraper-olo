import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function Recent() {
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("http://localhost:5001/recent/search");
        setRecentSearches(res.data);
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      }
    };
    fetchRecent();
  }, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="text-center mt-40">
        <h1 className="text-3xl font-bold">Recent Searches</h1>
      </div>

      <div className="p-4">
        {recentSearches.length > 0 ? (
          recentSearches.map(search => (
            <RecentSearchesCard
              key={search._id}
              id={search._id}
              product={search.product} // Ensure this matches the actual field name
              onClick={handleClick}
            />
          ))
        ) : (
          <div className="text-center">
            <p>No recent searches found</p>
          </div>
        )}
      </div>
    </div>
  );
}

const RecentSearchesCard = ({ id, product, onClick }) => {
  return (
    <div
      className="max-w-sm card bg-background-4 border-[3px] my-6 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="px-6 py-4">
        <ul className="list-none list-inside text-black">
          <li>Product: {product}</li>
        </ul>
      </div>
    </div>
  );
};
