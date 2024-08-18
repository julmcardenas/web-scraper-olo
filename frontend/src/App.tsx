import { lazy, useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import DataTable from "./components/Table";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./components/NavBar";
import Result from "./components/Result";
import { useNavigate } from "react-router-dom";
const mock_data = {
  data: {
    url: "https://headstarter.co/",
    date: "2021-09-01",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    headings: ["Heading 1", "Heading 2", "Heading 3"],
    links: ["https://www.example.com", "https://www.example.com"],
  },
};

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({ url: null, description: null, headings: [], links: [] });

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (search === "") {
      setLoading(false);

      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape/name`, { product: search });
      const data = response.data;
      console.log("data", data);
      setData(data);
      setLoading(false);
      navigation("/results", {
        state: { ...data },
      });

      // save search data to the database
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
      <Navbar isLoggedIn={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="max-w-2xl w-full px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Web Scraper</h1>
          <p className="text-muted-foreground mb-8">Enter a URL to scrape and view the page information.</p>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center border rounded-md bg-background">
              <input
                type="text"
                placeholder="Enter a product name"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 p-3 border-none focus:ring-0"
              />
              <button type="submit" className="px-4 py-3 rounded-r-md">
                Scrape
              </button>
            </div>
          </form>
          {loading && (
            <div className="flex items-center justify-center mb-8">
              <div className="w-6 h-6 text-primary" />
              <span className="ml-2 text-muted-foreground">Loading...</span>
            </div>
          )}
          {error && <div className="bg-red-500 text-red-50 p-4 rounded-md mb-8">{error}</div>}
        </div>

        {/* {data && <Result {...data} />} */}
        {/* {openModal && modalData && (
          // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          //   <div className="bg-white p-6 rounded-md shadow-md text-gray-600">
          //     <h2 className="text-2xl font-bold mb-4">Modal</h2>
          //     <p className="text-muted-foreground mb-4">{modalData.description}</p>
          //     <button onClick={handleClose} className="px-4 py-2 bg-primary text-gray-600 rounded-md">
          //       Close
          //     </button>
          //   </div>
          // </div>
          <>
            <p>
              <a>{modalData.url}</a>
            </p>
            <p>{modalData.description}</p>
          </>
        )} */}
        {openModal && modalData && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{modalData.url}</h2>
            <p className="text-muted-foreground mb-4">{modalData.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Headings</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {modalData.headings.map((heading, i) => (
                    <li key={i}>{heading}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Links</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {modalData.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-primary hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
