import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Navbar from "../components/NavBar";

interface ProductData {
  productName: string;
  pros: string[];
  cons: string[];
  score: number;
  review: string;
  videos: Array<{ url: string; thumbnail: string; link: string }>;
  comments: Array<{ username: string; text: string }>;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function CheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/product/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData) return <div>No product data available</div>;

  const { productName, pros = [], cons = [], score, review, videos = [], comments = [] } = productData;

  const getBadgeDetails = (score: number): { text: string; color: string } => {
    if (score <= 49) {
      return { text: "Not recommended", color: "text-0" };
    } else if (score >= 50 && score <= 59) {
      return { text: "Unpopular", color: "text-50" };
    } else if (score >= 60 && score <= 74) {
      return { text: "Decent", color: "text-60" };
    } else if (score >= 75 && score <= 89) {
      return { text: "", color: "text-75" };
    } else if (score >= 90 && score <= 100) {
      return { text: "Popular!", color: "text-90" };
    }
    return { text: "", color: "text-black" };
  };

  const { text: badgeText, color: badgeColor } = getBadgeDetails(score);

  return (
    <div className="result-container w-screen min-h-screen bg-[rgb(247,243,240)] flex flex-col items-center p-5">
      <main className="result-grid w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-[90px]">
        <div className="result-top-2 col-span-1 row-span-1">
          <h1 className="text-3xl font-bold text-black">
            Product: {productName}
          </h1>
          <div className="videoframe-container relative ">
            {videos.length > 0 ? (
              <div
                key={videos[0].url}
                className="videoframe-main relative cursor-pointer"
                style={{
                  backgroundImage: `url(${videos[0].thumbnail})`,
                }}
                onClick={() =>
                  window.open(videos[0].link, "_blank", "noopener,noreferrer")
                }
              ></div>
            ) : (
              <div>No video available</div>
            )}
          </div>

          <div className="score-container border-3 border-dotted border-background-6 mt-4 p-4">
            <div className="score-text-box">
              <h1 className="text-2xl font-bold text-black">
                Reviewpal scores this...
              </h1>
              <div className="mt-4 justify-center">
                <Badge
                  variant="success"
                  className={`font-extrabold text-6xl p-8 ${badgeColor}`}
                >
                  {score}
                </Badge>
              </div>
              <h1 className={`text-xl font-bold mt-2 ${badgeColor}`}>
                {badgeText}
              </h1>
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card verdict bg-background-7 border-[3px]">
            <div className="card-header bg-background-2 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
              <h2 className="text-lg font-bold text-black">Our Verdict</h2>
            </div>
            <div className="card-content text-1">
              <p>{review}</p>
            </div>
          </div>

          <div className="card watched bg-background-7 border-[3px]">
            <div className="card-header bg-background-4 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
              <h2 className="text-lg font-bold text-black">
                We watched these:
              </h2>
            </div>
            <div className="card-content videos">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="videoframe-thumbnail"
                  style={{
                    border: "1px solid #000",
                    borderRadius: "2px",
                    backgroundImage: `url(${video.thumbnail})`,
                  }}
                  onClick={() =>
                    window.open(video.link, "_blank", "noopener,noreferrer")
                  }
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-background-7">
            <div className="card-header bg-background-9 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
              <h2 className="text-lg font-bold text-black">Pros</h2>
            </div>
            <div className="card-content text-1 bg-background-7">
              <ul className="list-none pl-4 w-full max-w-lg">
                {pros.map((pro, index) => (
                  <li
                    key={index}
                    className="checkmarks flex items-start space-x-2 text-left"
                  >
                    <CheckIcon
                      className="text-green-600 flex-shrink-0"
                      style={{
                        fontSize: "1.25rem",
                        minWidth: "1.25rem",
                        minHeight: "1.25rem",
                      }}
                    />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card bg-background-7">
            <div className="card-header bg-background-8 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
              <h2 className="text-lg font-bold text-black">Cons</h2>
            </div>
            <div className="card-content text-1 bg-background-7">
              <ul className="list-none pl-4 w-full max-w-lg">
                {cons.map((con, index) => (
                  <li
                    key={index}
                    className="xmarks flex items-start space-x-2 text-left"
                  >
                    <XIcon
                      className="text-red-600 flex-shrink-0"
                      style={{
                        fontSize: "1.25rem",
                        minWidth: "1.25rem",
                        minHeight: "1.25rem",
                      }}
                    />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-1">
          <div className="card bg-background-7">
            <div className="card-header bg-background-3 card-header border-t-0 border-l-0 border-r-0 border-b border-b-[3px] border-black border-solid rounded-tl-md rounded-tr-md">
              <h2 className="text-lg font-bold text-black">Comments</h2>
            </div>
            <div className="card-content text-1">
              <ul className="list-none pl-4 w-full max-w-lg">
                {comments.map((comment, index) => (
                  <li key={index} className="flex flex-col mb-2">
                    <span className="font-bold">{comment.username}</span>
                    <p>{comment.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
