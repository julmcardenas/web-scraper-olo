import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface Video {
  title: string;
  thumbnail: string;
  link: string;
}

interface ProductReview {
  _id: string;
  product: string;
  date: string;
  review: string;
  pros: string[];
  cons: string[];
  userId: string;
  score: number;
  videos: Video[];
}

const mock_data = [
  {
    _id: '1',
    product: "Noise-Cancelling Headphones",
    review:
      "High-quality noise-cancelling headphones with advanced audio technology for an immersive listening experience.",
    pros: [
      "Excellent noise-cancellation performance",
      "Comfortable and adjustable design",
      "Long battery life",
      "Wireless connectivity",
    ],
    cons: ["Expensive compared to regular headphones", "May not be suitable for sports or outdoor activities"],
    videos: [{
      title: "Video 1",
      thumbnail: "https://via.placeholder.com/500x300",
      link: "https://www.youtube.com/watch?v=abcdefghijk",
    }, {
      title: "Video 2",
      thumbnail: "https://via.placeholder.com/500x300",
      link: "https://www.youtube.com/watch?v=lmnopqrst",
    }],
    date: '2021-09-01',
    userId: '1',
    score: 4.5,
  },
  {
    _id: '2',
    product: "Smartphone",
    review:
      "High-quality smartphone with advanced features for an immersive user experience.",
    pros: [
      "High-resolution display",
      "Long battery life",
      "Fast performance",
      "High-quality camera",
    ],
    cons: ["Expensive compared to regular phones", "May not be suitable for budget-conscious users"],
    videos: [{
      title: "Video 1",
      thumbnail: "https://via.placeholder.com/500x300",
      link: "https://www.youtube.com/watch?v=abcdefghijk",
    }, {
      title: "Video 2",
      thumbnail: "https://via.placeholder.com/500x300",
      link: "https://www.youtube.com/watch?v=lmnopqrst",
    }],
    date: '2021-09-02',
    userId: '1',
    score: 4.0,
  },
]

// {
//   product: "Noise-Cancelling Headphones",
//   review:
//     "High-quality noise-cancelling headphones with advanced audio technology for an immersive listening experience.",
//   pros: [
//     "Excellent noise-cancellation performance",
//     "Comfortable and adjustable design",
//     "Long battery life",
//     "Wireless connectivity",
//   ],
//   cons: ["Expensive compared to regular headphones", "May not be suitable for sports or outdoor activities"],
//   videos: ["https://www.youtube.com/watch?v=abcdefghijk", "https://www.youtube.com/watch?v=lmnopqrstuv"],
//   _id: '1',
//   date: '2021-09-01',
//   userId: '1',
//   score: 4.5,
// }

export default function SearchHistory() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [history, setHistory] = useState<ProductReview[]>(mock_data);
  const [selectedProduct, setSelectedProduct] = useState<ProductReview | null>(mock_data[0]);

  const handleProductClick = (product: ProductReview) => {
    setSelectedProduct(product)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
  }

  useEffect(() => {
    // Fetch the search history data from the API
    if (isLoaded && isSignedIn) {
      console.log('user', user.id);
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history/${user.id}`);
          console.log('response-front', response);
          setHistory(response.data.message);
          setSelectedProduct(response.data.message[0]);
        } catch (error) {
          console.error('Error fetching search history:', error);
        }
      };

      fetchHistory();

    }
  }, [isLoaded]);

  if (!user || !isSignedIn) {
    return (<>
      <Navbar isLoggedIn={false} />
      <div className="flex items-center justify-center h-screen"><h1 className="text-3xl">Sign in to view Search History</h1></div>
    </>
    )
  }

  return (
    <div className="w-screen py-12 px-12 ">
      <Navbar isLoggedIn={false} />
      <h1 className="text-2xl font-bold mb-6 mt-16">Search History</h1>

      {/* <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.length > 0 ? history.map((search) => (
            <div key={search._id} className="bg-background rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleProductClick(search)}>
              <h3 className="font-medium">{search.product}</h3>
              <p className="text-sm text-muted-foreground">{search.date}</p>
            </div>
          )) : <div className="text-center"><p>No search history found</p></div>}
        </div> */}


      <div className="flex w-full space-x-4">

        <div className="w-1/3 h-full bg-background rounded-lg border-2">
          <ul className="divide-y divide-muted">
            {history && history.map((search) => (
              <li
                key={search._id}
                className="px-4 py-3 hover:bg-muted/50 cursor-pointer"
                onClick={() => handleProductClick(search)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h3 className="font-medium break-all">{search.product}</h3>
                    <p className="text-sm text-muted-foreground">{search.date}</p>
                  </div>
                  {'>'}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedProduct && (
          <div className="w-2/3  bg-background rounded-lg  w-full max-w-2xl p-6">
            <div className="card bg-background-7">
              <div className="flex justify-between items-center mb-4">
                <div className="card-header bg-background-9 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
                  <h2 className="text-xl font-bold">{selectedProduct.product}</h2>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 px-4 text-justify">{selectedProduct.review}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pros</h3>
                  <ul className="list-disc pl-8 space-y-2">
                    {selectedProduct.pros.map((pro, index) => (
                      <li className='text-left' key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cons</h3>
                  <ul className="list-disc px-4 space-y-2">
                    {selectedProduct.cons.map((con, index) => (
                      <li className='text-left' key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Video Links</h3>
                <div className="space-y-2">
                  {selectedProduct.videos.map((video, index) => (
                    <a
                      key={index}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {video.link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}