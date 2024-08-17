import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
// import axios from "axios";

const mock_data = [
    {
        url: "https://headstarter.co/",
        date: "2021-09-01",
        summary: "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
        pros: ["Pro 1", "Pro 2", "Pro 3"],
        cons: ["Con 1", "Con 2", "Con 3"],
        commentSummary: "This is a comment summary.",
    },
    {
        url: "https://headstarter.co/",
        date: "2021-09-01",
        summary: "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
        pros: ["Pro 1", "Pro 2", "Pro 3"],
        cons: ["Con 1", "Con 2", "Con 3"],
        commentSummary: "This is a comment summary.",
    },
]

export default function SearchHistory() {
    const [history, setHistory] = useState([{url:'', date:'', summary:'', pros:[], cons:[], commentSummary:''}]);

    useEffect(() => {
        // Fetch the search history data from the API
        const fetchHistory = async () => {
            try {
                // const response = await axios.get(`/api/${user}/history`); // Replace with your API endpoint
                // setHistory(response.data);
                setHistory
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div>
            <Navbar isLoggedIn={false} />
            <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="p-4 border rounded-lg shadow">
              <p className="text-lg font-semibold">URL: <a href={item.url} className="text-blue-600 hover:underline">{item.url}</a></p>
              <p className="text-gray-700"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Summary:</strong> {item.summary}</p>
              
              <div className="mt-2">
                <p className="text-gray-700"><strong>Pros:</strong></p>
                <ul className="list-disc list-inside">
                  {item.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="text-gray-700"><strong>Cons:</strong></p>
                <ul className="list-disc list-inside">
                  {item.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="text-gray-700"><strong>Summary of Comments:</strong> {item.commentSummary}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No search history available.</p>
      )}
    </div>
        </div>
    );
}